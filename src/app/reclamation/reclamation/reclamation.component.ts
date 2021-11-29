import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  reclamtionForm:FormGroup
  show_section_demande=true
  reference=new Date().getFullYear().toString()+"-0000-" + Math.random().toString().substr(2,2)
  
  etablissements:any 
  // fileToUpload: Array<File> = [];
  date=new Date().toISOString().split('T')[0].toString()
  users:any
  natures:any
  user_selected:any
  submitted = false;
  constructor(private apiService:GenralDataService, private route:Router,
     private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.reclamtionForm=this.formbuilder.group({
      id_etablissement:['',Validators.required],
      matricule:['',Validators.required],
      date:['',Validators.required],
      id_nature:['',Validators.required],
      contenu:['',Validators.required],
      // nature:['',Validators.required],
      reclamtion:['',Validators.required],
      id_demandeur:['',Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      status:['',Validators.required],
      reference:['',Validators.required]



    })
    this.get_all_Etablissement()
    this.get_all_NatureReclamtion()
    this.get_all_users()
  } 
  get f() { return this.reclamtionForm.controls; }
  save_reclamation(){
    this.submitted = true;
    let data={
      matricule:this.user_connect.matricule,
      subject:this.reclamtionForm.value.subject,
      contenu:this.reclamtionForm.value.reclamtion,
      status:"en attente",
      date:new Date(),
      reference:this.reference

    } 
    // let formdata= new FormData()
    // formdata.append('matricule', this.reclamtionForm.value.matricule) 
    // formdata.append('subject', this.reclamtionForm.value.subject)
    // formdata.append('contenu', this.reclamtionForm.value.reclamtion)
    // formdata.append('status', "en attente")
    // formdata.append('date', new Date().toString())
    // formdata.append('reference', this.reference)
    // formdata.append('nom', this.reclamtionForm.value.nom)
    // formdata.append('prenom', this.reclamtionForm.value.prenom)
    // formdata.append('file', this.fileToUpload[0])

     console.log('data reclamaation',this.reclamtionForm.value)
     this.reclamtionForm.patchValue({
      status:"en attente",
      date:new Date().toISOString().split('T')[0].toString(),
      reference:this.reference,
      contenu:this.reclamtionForm.value.contenu,
      subject:this.reclamtionForm.value.subject,
      matricule:this.reclamtionForm.value.matricule,
      nom:this.reclamtionForm.value.nom,
      prenom:this.reclamtionForm.value.prenom,
      id_demandeur:this.user_connect.id,
      id_etablissement:this.user_selected.etablissement.id
     })
     console.log('res of add',this.reclamtionForm.value)
    this.apiService.save_reclamation(this.user_connect.id,
      this.reclamtionForm.value.id_etablissement,
      this.reclamtionForm.value.id_nature,this.reclamtionForm.value).subscribe(res=>{
      console.log('res of add',res)
      Swal.fire({text:'reclamation envoyé avec success',icon:'success'})
      this.show_section_demande=false
    //  this.route.navigateByUrl('/reclamation/list-reclamation')
    })
  }
  
  get_all_Etablissement(){
    this.apiService.get_All_Etablissement().subscribe(res=>{
      console.log('all etablissements',res)
      this.etablissements=res
   })
  }
  
  
  get_all_NatureReclamtion(){
    this.apiService.get_all_natures().subscribe(res=>{
      console.log('all natures',res)
      this.natures=res
   })
  }
  
  // recuperphoto(file: any) {
  //   this.fileToUpload = <Array<File>>file.target.files;
  //   console.log("file to upload",this.fileToUpload)

  // }
   

  get_all_users(){
    this.apiService.get_all_users().subscribe((res:any)=>{
      console.log('all users',res)
      this.users=res
   })
  } 


  selectedUser(){
    this.user_selected= this.users.filter((el:any)=>el.matricule==this.reclamtionForm.value.matricule)[0]
    console.log('user',this.user_selected)
    this.reclamtionForm.patchValue({
      nom:this.user_selected.lastName,
      prenom:this.user_selected.firstName,
      id_etablissement:this.user_selected.etablissement.name

    })
  }


}