import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-demande-actifs',
  templateUrl: './demande-actifs.component.html',
  styleUrls: ['./demande-actifs.component.scss']
})
export class DemandeActifsComponent implements OnInit {

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  demandes_actifs:any[]=[]
  status_selected:any
  constructor(private apiService:GenralDataService,private router: Router) { }

  ngOnInit() {
    this.get_mes_demandes_actif()
  }
  
  get_mes_demandes_actif(){
    this.apiService.get_All_demandes_Actif().subscribe((res:any)=>{
      console.log('reponse of demande_actifs',res)
      if(this.user_connect.profil=="ADMIN" )    {
        this.demandes_actifs=res 
      console.log('reponse of demande_it',this.demandes_actifs)

      }
      else{
        this.demandes_actifs=res.filter((el:any)=>el.user.id==this.user_connect.id)

      }
    })

  }

   filter_by_type(event:Event){
     console.log("event selected",event)
    //  this.mes_demandes=this.mes_demandes.filter(el=>el.type==event)
   }

   
   filter_by_status(){
    console.log('status',this.status_selected)
    this.apiService.get_All_demandes_Actif().subscribe((res:any)=>{
      if(this.user_connect.profil=="ADMIN"){
        this.demandes_actifs=res
        this.demandes_actifs=this.demandes_actifs.filter(el=>el.status===this.status_selected) 
      }
      else{
        this.demandes_actifs=res.filter((el:any)=>el.user.id==this.user_connect.id) 
        this.demandes_actifs=this.demandes_actifs.filter(el=>el.status===this.status_selected) 
      }


        })
      }


      isAdmin(){
        return localStorage.getItem('role')=="ADMIN" ? true : false 
      
       }

}
