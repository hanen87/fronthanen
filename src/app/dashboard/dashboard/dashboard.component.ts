import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  demande_attestations:any
  reclamtions:any[]=[]
  demandes_actifs:any[]=[]
  demandes_it:any[]=[]

  constructor(private apiService:GenralDataService) { }


  ngOnInit() {
    this.get_all_demande_attestations() 
    this.get_all_reclamations()
    this.get_mes_demandes_actif() 
    this.get_mes_demandes_it()

              } 

  get_all_demande_attestations(){
    this.apiService.get_all_demande_attestations().subscribe((res:any)=>{
       this.demande_attestations=res
    })
     }


  get_all_reclamations(){
    this.apiService.get_All_reclamation().subscribe((res:any)=>{
       this.reclamtions=res
    })
     }
  

  get_mes_demandes_actif(){
    this.apiService.get_All_demandes_Actif().subscribe((res:any)=>{
      this.demandes_actifs=res
    })

     } 


  get_mes_demandes_it(){  
    this.apiService.get_All_demandes_It().subscribe((res:any)=>{
      this.demandes_it=res  
         })
    }
    isRH(){
      return localStorage.getItem('service')==='0'? true: false
     }
   
     isIT(){
      return localStorage.getItem('service')==='1'? true: false
     }

}
