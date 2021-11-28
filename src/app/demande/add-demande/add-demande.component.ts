import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.scss']
})
export class AddDemandeComponent implements OnInit {
  form:FormGroup
  etablissements:any
  added_lignes:any[]=[]
  equipe:any
  users:any
  i=1
  reference=new Date().getFullYear().toString()+"-0000" + Math.random().toString().substr(2,2)
  user_selected:any
  date=new Date().toISOString().split('T')[0].toString()
  show_demande=false
  
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  show_section_demande=true  
  constructor(private apiService:GenralDataService,
  private modalService:NgbModal,
  private formbuilder:FormBuilder) { }

  ngOnInit() {

    this.get_all_Etablissement()
    this.get_all_users()
    this.form=this.formbuilder.group({
      type:['',Validators.required],
      commentaire:['',Validators.required],
      date:['',Validators.required],
      matricule:['',Validators.required],
      motif:['',Validators.required],
      etablissement:['',Validators.required],
      nom:['',Validators.required],
      date_signature_contrat:['',Validators.required]
    })

    if(localStorage.getItem('added_lignes')) {
      this.added_lignes=JSON.parse(localStorage.getItem('added_lignes'))

    }
    else {
      this.added_lignes=[]
    }
  }
 

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selected_equipe(event:any){
    if(this.form.value.type=="Attestation de Pret" || this.form.value.type=="Attestation de salaire"){
       this.equipe="Paie"
       console.log('id equipe', this.equipe)
    }else
    if(this.form.value.type=="Attestation de Travail" ||this.form.value.type=="Attestation de stage" ||this.form.value.type=="Attestation de l'IRPP"){
      this.equipe="Administratif" 
      console.log('id equipe', this.equipe)

    }
    else {
      this.equipe="Social"
      console.log('id equipe', this.equipe)

    }
  }
  save_ligne_demande_attestation(){
    // this.show_demande=!this.show_demande
   
    let dataForm={
      motif:this.form.value.motif,
      type:this.form.value.type,
      nom:this.form.value.nom,
      date: new Date(),
      matricule:this.form.value.matricule,
      reference: this.reference+"/"+this.i,
      commentaire:this.form.value.commentaire,
      date_contrat:this.form.value.date_signature_contrat,
      etablissement:this.form.value.etablissement,
      status:"En instance",
      equipe:this.equipe
    }

    this.apiService.save_ligne_demande_attestation(this.user_connect.id,dataForm).
    subscribe((res:any)=>{
      console.log('reponse add ligneeeee ',res)
          this.added_lignes.push(res)
          // this.show_demande=false
          localStorage.setItem('added_lignes',JSON.stringify(this.added_lignes))
          this.i=this.i+1   
          this.form.patchValue({
            type:"",
            commentaire:"",
            date:"",
            matricule:"",
            motif:"",
            etablissement:"",
            nom:"",
            date_signature_contrat:""
          })
          console.log('ggggg',this.added_lignes)
    })
  }

   

  save(){
    let dataDemande={

      matricule:this.form.value.matricule,
      etablissement:this.user_selected.etablissement.name,
      date:new Date(),
      date_contrat:this.form.value.date_signature_contrat,
      reference:this.reference

    }
    let ids=this.added_lignes.map((el:any)=>{return el.id} )
    if(this.added_lignes.length<=0){
      Swal.fire({text:'remplir votre attestation',icon:'error'})
    }
    else{
      this.apiService.save_demande_attestations(dataDemande,ids).subscribe(res=>{
        console.log("pushedddd",res)
        localStorage.removeItem('added_lignes')
        this.added_lignes=[]
        Swal.fire({text:'votre demande a été envoyé avec succés',icon:'success'})
        this.show_section_demande=false
      })
    }
    }
     
    supprimer_demande(demande:any,index:any){
    this.added_lignes.splice(index,1)
    localStorage.setItem('added_lignes',JSON.stringify(this.added_lignes))

     this.i=this.i-1
     console.log("id demande",demande.id)
    this.apiService.delete_ligne_demande_attestation(demande.id).subscribe(res=>{
      console.log('res',res)
    })

    } 

    get_all_Etablissement(){
      this.apiService.get_All_Etablissement().subscribe(res=>{
        console.log('all etablissements',res)
        this.etablissements=res
     })
    }
    

    get_all_users(){
      this.apiService.get_all_users().subscribe(res=>{
        console.log('all users',res)
        this.users=res
     })
    }

    selectedUser(){
      this.user_selected= this.users.filter((el:any)=>el.matricule==this.form.value.matricule)[0]
      console.log('user',this.user_selected)
      this.form.patchValue({
        date_signature_contrat:this.user_selected.date_contrat,
        nom:this.user_selected.lastName + ' '+ this.user_selected.firstName ,
        etablissement:this.user_selected.etablissement.name

      })
    }
}