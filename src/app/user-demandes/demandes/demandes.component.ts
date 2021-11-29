import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss']
})
export class DemandesComponent implements OnInit {

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  demandes_it:any[]=[]
  status_selected:Date
  constructor(private apiService:GenralDataService,private router: Router) { }

  ngOnInit() {
    this.get_mes_demandes_it()
  }
  
  get_mes_demandes_it(){  
      this.apiService.get_All_demandes_It().subscribe((res:any)=>{
        if(this.user_connect.profil=="ADMIN" )    {
          this.demandes_it=res 
        console.log('reponse of demande_it',this.demandes_it)

        }
        else{
          this.demandes_it=  res.filter((el:any)=>el.user.id==this.user_connect.id)
          console.log('reponse of demande_it',this.demandes_it)

        }
           })

  }
   
  isAdmin(){
    return localStorage.getItem('role')=="ADMIN" ? true : false 
  
   }
   
  filter_by_status(){
     console.log('status',this.status_selected)
     this.apiService.get_All_demandes_It().subscribe((res:any)=>{
       if(this.user_connect.profil=="ADMIN"){
        this.demandes_it= res  
        this.demandes_it=this.demandes_it.filter(el=>el.status===this.status_selected) 
       }
       else{
        this.demandes_it= res.filter((el:any)=>el.user.id==this.user_connect.id)   
        this.demandes_it=this.demandes_it.filter(el=>el.status===this.status_selected) 
       }
 

         })

   }
   
   valider_demande(id:any){



    Swal.fire({
      title: 'Are you sure ti validate ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, validate it!'
    }).then((result) => {
      if (result.isConfirmed) {        
     this.apiService.valider_demande_application(id).subscribe(res=>{
      console.log('validation ',res)
      Swal.fire(
        'Validated!',
        'Your demande has been validated.',
        'success'
      )
       
      this.get_mes_demandes_it()

    }) 

      }
    })
    
   }


   annuler_demande(id:any){

    Swal.fire({
      title: 'Are you sure ti validate ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, validate it!'
    }).then((result) => {
      if (result.isConfirmed) { 

     this.apiService.annuler_demande_application(id).subscribe(res=>{
      console.log('validation ',res)

      
      Swal.fire(
        'Validated!',
        'Your demande has been validated.',
        'success'
      )

      this.get_mes_demandes_it()

    }) 

      }
    })
      
   }

}
