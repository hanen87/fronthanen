import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-new-demande',
  templateUrl: './new-demande.component.html',
  styleUrls: ['./new-demande.component.scss']
})
export class NewDemandeComponent implements OnInit {
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  matricule=""
  fonction=""
  nom=""
  etablissement=""
  prenom=""
  applications:any
  show_section_demande=true

  demandeur=""
  selected_app:any[]=[]
  added_applications:any[]=[]
  show_demandeur_search:any
  reference=new Date().getFullYear().toString()+"-0000-" + Math.random().toString().substr(2,2)

  form:FormGroup  
  constructor(private apiService:GenralDataService, private formBuilder : FormBuilder,private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      pour: ['', Validators.required],
      application: ['', Validators.required],
      profil: ['', Validators.required],
      matricule: ['', Validators.required],
      etablissement: ['', Validators.required],
      date_effect: ['', Validators.required],
      date_annulation: ['', Validators.required],
      remarque: ['', Validators.required]

    });

    this.get_Applications() 

    if(localStorage.getItem('added_applications')) {
      this.added_applications=JSON.parse(localStorage.getItem('added_applications'))

    }
    else {
      this.added_applications=[]
    }

  }
  
  get_Applications(){
    this.apiService.get_All_application().subscribe(res=>{
      this.applications=res
      console.log('res aplication',res)
    })
  }

  reset(){
    this.form.reset()
  }
   
  getDemandeurInfo(){
   console.log('maticule ********',this.form.value.matricule)

   if(this.form.value.pour=="Nouvelle Recrue" || this.form.value.pour=="Surbonne" || this.form.value.pour=="Interminaire"){
    this.matricule=""
    this.fonction=""
    this.nom=""
    this.etablissement=""
    this.prenom=""
    this.apiService.getone_user(this.form.value.matricule).subscribe((res:any)=>{
      console.log('demandeur search ',res)

      if(res!=null){
        this.demandeur=res.id
        this.matricule=res.matricule
        this.fonction=res.fonction
        this.nom=res.firstName
         this.etablissement=res.etablissement.name
        this.prenom=res.lastName
      } 
      else {
        this.show_demandeur_search=true
        this.demandeur=this.user_connect.id
      }
      
    })
   
   }
   else {
    this.demandeur=this.user_connect.id
    this.matricule=this.user_connect.matricule
    this.fonction=this.user_connect.fonction
    this.nom=this.user_connect.firstName
     this.etablissement=this.user_connect.etablissement.name
    this.prenom=this.user_connect.lastName
   }
  }
  sendDemande(){
    let Data_Demande= {
      date_effect:this.form.value.date_effect,
      profil:this.form.value.profil,
      pour:this.form.value.pour,
      // etablissement:this.form.value.etablissement,
      date:new Date(),
      status:"en attente",
      type:"accés", 
      nom:this.nom,
      prenom:this.prenom,
      matricule:this.matricule,
      reference:this.reference,
      remarque:this.form.value.remarque,
      date_annulation:this.form.value.date_annulation
    }

    let ids=this.added_applications.map((el:any)=>{return el.id})

    this.apiService.save_demande_It(this.user_connect.id,Data_Demande,ids).subscribe(res=>{
      console.log('res of send it',res)
      localStorage.removeItem('added_applications')
      
      Swal.fire({text:'demande send with success',icon:'success'}) 
      this.show_section_demande=false

    })
  }

  Ajouter_Application_to_SelectedApplications(){
    this.selected_app.push({
      date: new Date(),
      app:this.applications.filter(el=>el.id==this.form.value.application)[0].nom,
      profil:this.form.value.profil,
      // magasin:this.form.value.magasin
    })

     let Data_App_Ligne={
      profil:this.form.value.profil,
      nom:this.nom,
      prenom:this.prenom,
      matricule:this.form.value.matricule,
      pour:this.form.value.pour,
      // magasin:this.form.value.magasin,
      date:new Date(),
      status:"en attente",
      type:"accés",
     }
    this.apiService.save_ligne_demande_application(this.user_connect.id,this.form.value.application,
      Data_App_Ligne).subscribe(res=>{
        this.added_applications.push(res)
        localStorage.setItem('added_applications',JSON.stringify(this.added_applications))

        console.log('res',res)

    })
  } 

  supprimer_demande(index:any){
    this.added_applications.splice(index,1)
    localStorage.setItem('added_applications',JSON.stringify(this.added_applications))

    this.apiService.delete_ligne_demande_application(index).subscribe(res=>{
      console.log('res',res)
    })
    }
}
