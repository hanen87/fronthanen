import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revocation',
  templateUrl: './revocation.component.html',
  styleUrls: ['./revocation.component.scss']
})
export class RevocationComponent implements OnInit {
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  matricule=""
  fonction=""
  nom=""
  etablissement=""
  prenom=""
  demandeur=""
  added_applications:any[]=[]
  reference=new Date().getFullYear().toString()+"-0000-" + Math.random().toString().substr(2,2)
  show_section_demande=true

  // applications:any
  // user_connect=JSON.parse(localStorage.getItem('current_user')!)
  applications:any
  selected_app:any[]=[]
  form:FormGroup  
  access_it:any
  constructor(private apiService:GenralDataService,
     private formBuilder : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      actif: ['', Validators.required],
      categorie: ['', Validators.required],
      motif: ['', Validators.required],
      pour: ['', Validators.required],
      remarque: ['', Validators.required],
      matricule:['', Validators.required],
      application: ['', Validators.required],
      profil: ['', Validators.required],
      // magasin: ['', Validators.required],
      // date_effect: ['', Validators.required],
      // date_annulation: ['', Validators.required],
      

    });
   this.get_all_access()
   this.get_Applications()
   
   if(localStorage.getItem('added_applications')) {
    this.added_applications=JSON.parse(localStorage.getItem('added_applications'))

  }
  else {
    this.added_applications=[]
  }

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
      type:"Révocation d'accés",
     }
    this.apiService.save_ligne_demande_application(this.user_connect.id,this.form.value.application,
      Data_App_Ligne).subscribe(res=>{
        this.added_applications.push(res)
        localStorage.setItem('added_applications',JSON.stringify(this.added_applications))

        console.log('res',res)

    })
  } 
  reset(){
    this.form.reset()
  }
  get_Applications(){
    this.apiService.get_All_application().subscribe(res=>{
      this.applications=res
      console.log('res aplication',res)
    })
  }
  retirDemande(id:any){
    this.apiService.delete_accesit(id).subscribe(res=>{
      console.log('res of send it',res)
      Swal.fire({
        text:"révocation d'accés",
        icon:"success"
      })
      this.get_all_access()
    })
  }

  get_all_access(){
    this.apiService.get_all_demande_ligne_application().subscribe((res:any)=>{
      console.log('reponse access ligne of it',res)
      this.access_it=res.filter(el=> el.user.id==this.user_connect.id)          
    })

  }

  getDemandeurInfo(){
    console.log('maticule ********',this.form.value.pour)
 
    if(this.form.value.pour=="Surbonne"||this.form.value.pour=="Interminaire"){
     this.matricule=""
     this.fonction=""
     this.nom=""
     this.etablissement=""
     this.prenom=""
     this.apiService.getone_user(this.form.value.matricule).subscribe((res:any)=>{
       console.log('res of one user',res)
       if(res!=null){
         this.demandeur=res.id
         this.matricule=res.matricule
         this.fonction=res.fonction
         this.nom=res.firstName
         this.etablissement=res.etablissement.name
         this.prenom=res.lastName
       } 
       else {
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
      // magasin:this.form.value.magasin,
      date:new Date(),
      status:"en attente",
      type:"révocation d'accés", 
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
}
