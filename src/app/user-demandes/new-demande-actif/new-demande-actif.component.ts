import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-demande-actif',
  templateUrl: './new-demande-actif.component.html',
  styleUrls: ['./new-demande-actif.component.scss']
})
export class NewDemandeActifComponent implements OnInit {
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  actifs:any
  show_section_demande=true
  selected_actif:any[]=[]
  form:FormGroup  
  categories:any
  added_actifs:any[]=[]
  demandeur=""
  matricule=""
  fonction=""
  nom=""
  // magasin=""
  etablissement=""
  prenom=""
  motif1:any
  reference=new Date().getFullYear().toString()+"-0000-" + Math.random().toString().substr(2,2)

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
      matricule:['', Validators.required]

    });
  

    this.get_Actifs()
    this.get_Type_Actifs() 

    if(localStorage.getItem('added_actifs')) {
      this.added_actifs=JSON.parse(localStorage.getItem('added_actifs'))

    }
    else {
      this.added_actifs=[]
    }

  }
  
  get_Actifs(){
    this.apiService.get_all_actifs().subscribe(res=>{
      this.actifs=res
      console.log('res actifs',res)
    })
  }

  get_Type_Actifs(){
    this.apiService.get_All_typeActif().subscribe((res:any)=>{
      this.categories=res
      console.log('res types actif',res)
    })
  } 


  reset(){
    this.form.reset()
  }

  sendDemandeActif(){
    let Data_Demande= {
      date:new Date(),
      status:"en attente",
      pour:this.form.value.pour,
      type:"Demande Actif",
      categorie:this.form.value.categorie,
      motif:this.form.value.motif,
      remarque:this.form.value.remarque,
      nom:this.nom,
      prenom:this.prenom,
      matricule:this.matricule,
      reference:this.reference
    }

    let ids=this.added_actifs.map((el:any)=>{return el.id} )

    this.apiService.save_demande_Actif(this.user_connect.id,Data_Demande,ids).
    subscribe(res=>{
      console.log('res of send Actif',res)
      Swal.fire({text:'demande send with success',icon:'success'})
      localStorage.removeItem('added_actifs')
      this.show_section_demande=false
    })
  }

  Ajouter_Actif_to_SelectedActifs(){
    this.selected_actif.push({
      actif:this.actifs.filter(el=>el.id==this.form.value.actif)[0].name,
      categorie:this.form.value.categorie,
      motif:this.form.value.motif
    })
this.motif1=this.form.value.motif
    let Data_App_Actif={
      profil:this.form.value.profil,
      pour:this.form.value.pour,
      // magasin:this.form.value.magasin,
      date:new Date(),
      status:"en attente",
      type:"Demande It",
      categorie:this.form.value.categorie,
      motif:this.form.value.motif

     }
    this.apiService.save_ligne_demande_actif(this.user_connect.id,
      this.form.value.actif,
      Data_App_Actif).subscribe(res=>{
        this.added_actifs.push(res)
        localStorage.setItem('added_actifs',JSON.stringify(this.added_actifs))
        console.log('res',res)

    })

  }
  

  getDemandeurInfo(){
    console.log('maticule ********',this.form.value.pour)
 
    if(this.form.value.pour=="Nouvelle Recrue"|| this.form.value.pour=="Surbonne"||this.form.value.pour=="Interminaire"){
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

  supprimer_demande(index:any){
    this.added_actifs.splice(index,1)
    localStorage.setItem('added_actifs',JSON.stringify(this.added_actifs))
    this.apiService.delete_ligne_demande_application(index).subscribe(res=>{
      console.log('res',res)
    })
    }

}
