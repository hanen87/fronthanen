import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-det-demande',
  templateUrl: './det-demande.component.html',
  styleUrls: ['./det-demande.component.scss']
})
export class DetDemandeComponent implements OnInit {
  
  demande_attestations:any
  selected_lignes=[]
  equipe:any
  form:FormGroup
  reference=new Date().toISOString().split('T')[0].toString()+"-0000-" + Math.random().toString().substr(2,3)
  id=this.activeroute.snapshot.params.id
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  lignes:any[]=[]
  etablissements:any
  constructor(private apiService:GenralDataService,
    private fb:FormBuilder,
    private route:Router,
    private modalService:NgbModal,
    private activeroute:ActivatedRoute) { }

  ngOnInit() {
    this.get_One_demande_attestations()
    this.get_all_Etablissement()
    this.form=this.fb.group({
      commentaire:['',Validators.required],
      motif:['',Validators.required],
      type:['',Validators.required],
      etablissement:['',Validators.required]
    })
  } 

  get_One_demande_attestations(){
    this.apiService.get_all_demande_attestations().subscribe((res:any)=>{
       this.demande_attestations=res.filter((el)=>el.id==this.id)[0]
       this.lignes=this.demande_attestations.lignes
      console.log('details one demande attestations ',this.demande_attestations)

    })
  }
  

  open(content:any) {
    if(this.selected_lignes.length<=0){
      Swal.fire({
        text:"sélectionner l'attestation à annuler",
        icon:"error"
      })
    }
    else{
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      }, (reason) => {
      });
    }

  }
  
  getSelected2() {
    
    this.selected_lignes = this.demande_attestations.lignes.filter(s => {
      return s.isCkecked;
    }).map((el)=>{return el.id});
    console.log('selected lignes',this.selected_lignes); 
  
  } 

  Annuler_demande(){
     let data={
       commentaire_annulation:this.form.value.commentaire,
       motif_annulation:this.form.value.motif,
     }
    for(let i=0;i<this.selected_lignes.length;i++){
         console.log('id ',this.selected_lignes[i])
         this.apiService.annuler_ligne_demande(this.user_connect.id,this.selected_lignes[i],data)
         .subscribe(res=>{
          console.log('res of annulation',res)
          Swal.fire('Annulation du ligne du reference')
          this.apiService.send_notification(this.selected_lignes[i]).subscribe(res=>{
            console.log('res notification',res)
          })
          this.get_One_demande_attestations()
        }) 
    }

  }
  Valider_demande(){
    if(this.selected_lignes.length<=0){
      Swal.fire({
        text:"sélectionner l'attestation à valider",
        icon:"error"
      })
    }
    else{
    let dataSousBoreaux={
      etablissement:this.form.value.etablissement,
      date_validation: new Date(),
      equipe:this.equipe,
      reference: this.reference
      }
    for(let i=0;i<this.selected_lignes.length;i++){
         console.log('id',this.selected_lignes[i])
         this.apiService.valider_ligne_demande(this.user_connect.id,this.selected_lignes[i])
         .subscribe(res=>{
          console.log('res of validation',res)
          Swal.fire('Validation du ligne du reference')
          this.get_One_demande_attestations()
          this.apiService.save_Sous_Bordeaux(dataSousBoreaux,this.selected_lignes).subscribe((res:any)=>{
            console.log('sous borderau',res)
            Swal.fire({
              text:"Validation with success et sous bordeau cree avec success",
              icon:"success"
            })
            //this.route.navigateByUrl('/bordereau/list')
           })
        }) 
    } 
  }
  }

  selected_equipe(event:any){
    if(this.form.value.type=="Attestation de Pret"){
       this.equipe="Paie"
       console.log('id equipe', this.equipe)
    }else
    if(this.form.value.type=="Attestation de Travail"){
      this.equipe="Admiratif" 
      console.log('id equipe', this.equipe)

    }
    else {
      this.equipe="Social"
      console.log('id equipe', this.equipe)

    }
  }

  get_all_Etablissement(){
    this.apiService.get_All_Etablissement().subscribe(res=>{
      console.log('all etablissements',res)
      this.etablissements=res
   })
  }

}
