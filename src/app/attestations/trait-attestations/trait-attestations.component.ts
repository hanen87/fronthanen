import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trait-attestations',
  templateUrl: './trait-attestations.component.html',
  styleUrls: ['./trait-attestations.component.scss']
})
export class TraitAttestationsComponent implements OnInit {

  demande_attestations:any
  etablissement_selected:any
  selected_lignes=[]
  selected_lignes1:any

  status_selected:any
  equipe:any
  form:FormGroup
  form1:FormGroup

  // reference=new Date().toISOString().split('T')[0].toString()+"-0000-" + Math.random().toString().substr(2,3)
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  lignes:any[]=[]
  etablissements:any
  etablissement:any
  etab:any
  constructor(private apiService:GenralDataService,
    private fb:FormBuilder,
    private route:Router,
    private modalService:NgbModal,
    private activeroute:ActivatedRoute) { }

  ngOnInit() {
    this.get_all_demande_attestations()
    this.get_all_Etablissement()
    this.form=this.fb.group({
      commentaire:['',Validators.required],
      motif:['',Validators.required],
      type:['',Validators.required],
      etablissement:['',Validators.required]
    })
this.form1=this.fb.group({
  etablissement:['',Validators.required]
 
})
console.log("etab",this.form1.value.etablissement)

  } 

  get_all_demande_attestations(){
    this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{
       this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)
       this.lignes=this.lignes.filter(el=>el.status=="En instance")
      console.log('lignes',this.lignes)
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
    
    this.selected_lignes = this.lignes.filter(s => {
      return s.isCkecked;
    }).map((el)=>{return el.id});
    console.log('selected lignes',this.selected_lignes); 

    this.selected_lignes1 = this.lignes.filter(s => {
      return s.isCkecked;
    }).map((el)=>{return el.status});
    console.log("status selected",this.selected_lignes1)

    this.etab = this.lignes.filter(s => {
      return s.isCkecked;
    }).map((el)=>{return el.etablissement});
    console.log("etab selected",this.etab[0])
  
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
          Swal.fire('Annulation du ligne')
          this.apiService.send_notification(this.selected_lignes[i]).subscribe(res=>{
            console.log('res notification',res)
          })
          this.get_all_demande_attestations()
        }) 
    }

  }
  isvalide(){
  
    // for(let i=0;i<this.lignes.length;i++){
    //   if(this.lignes[i].status=="En instance"){
    //     return true;
    //   }
    if(this.selected_lignes1[0]=="En instance"){
      console.log("true",this.selected_lignes1)
     return true;
    }
    
    //  return demande.status=="En instance" ? true : false 
  }
  Valider_demande(){
    if(this.selected_lignes.length<=0 ){
      Swal.fire({
        text:"sélectionner l'attestation à valider",
        icon:"error"
      })
    }
    // else if(this.isvalide()){
    //   Swal.fire({
    //     text:"ligne deja validée",
    //     icon:"error"
    //   })
    // }
    else {
      // console.log("etab",this.form1.value.etablissement)
    let dataSousBoreaux={
      etablissement:this.etab[0],
      date_validation: new Date(),
      equipe:this.user_connect.equipe,
      reference: new Date().toISOString().split('T')[0].toString()+"-0000-" + Math.random().toString().substr(2,3),
      etat:"validé"
      }
    for(let i=0;i<this.selected_lignes.length;i++){
         console.log('id',this.selected_lignes[i])
        //  console.log("status",this.selected_lignes[i])
         if(this.isvalide()){
          //  console.log("status",this.selected_lignes[i].status)
         this.apiService.valider_ligne_demande(this.user_connect.id,this.selected_lignes[i])
         .subscribe(res=>{
          console.log('res of validation',res)
          // Swal.fire('Validation du ligne du reference')
          this.get_all_demande_attestations()
          this.apiService.send_notification1(this.selected_lignes[i]).subscribe(res=>{
            console.log('res notification',res)
          })
          this.apiService.save_Sous_Bordeaux(dataSousBoreaux,this.selected_lignes).subscribe((res:any)=>{
            console.log('sous borderau',res)
            Swal.fire({
              text:"Validation et sous bordereau créé avec succès",
              icon:"success"
            })
            //this.route.navigateByUrl('/bordereau/list')
           })
        }) 
      }else{
        Swal.fire('ligne deja validée')
      }
     
  }
  }
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

  get_all_Etablissement(){
    this.apiService.get_All_Etablissement().subscribe(res=>{
      console.log('all etablissements',res)
      this.etablissements=res
   })
  }
   

  filter_by_etablisement(){
     
    console.log('status',this.etablissement_selected)
    if(this.etablissement_selected==="All"){
    this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{
      
     this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)


        })
      }else{
        this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{
      
          this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)
     
          this.lignes=this.lignes.filter(el=>el.etablissement===this.etablissement_selected)
        })
      }
    }

  filter_by_status(){
     
        console.log('status',this.status_selected)
        if(this.status_selected==="All"){
             
        this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{
          this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)  
      console.log("rrrr",this.lignes)
             })
        }
        else {
             
        this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{
          this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)  
          this.lignes=this.lignes.filter(el=>el.status===this.status_selected) 
    //  console.log("rrrr",this.lignes)
     
             })
        }
  }



  isGRH(){
    return localStorage.getItem('role')=="GRH" ? true : false 
   }
   
   isAdmin(){
    return localStorage.getItem('role')=="ADMIN" ? true : false 
  
   }
  
   isBO(){
    return localStorage.getItem('role')=="BureauOrdre" ? true : false 
   }
}