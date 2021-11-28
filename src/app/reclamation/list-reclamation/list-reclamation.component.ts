import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.scss']
})
export class ListReclamationComponent implements OnInit {
  reclamtions:any[]=[]
  etablissements:any
  reclamtionRequest={date_effet:"",date_cloture:"",reponse:""}
  idreclamtion:any
  constructor(private apiService:GenralDataService) { }

  ngOnInit() {
    this.get_all_reclamations()
  } 

  get_all_reclamations(){
    this.apiService.get_All_reclamation().subscribe((res:any)=>{
      console.log('reclamtions',res)
       this.reclamtions=res
      
    })
  }
   
  passerId(id:any){
    this.idreclamtion=id
    console.log('id',id)
  }
  traiterReclamtion(){
    this.apiService.traiter_reclamation(this.idreclamtion,this.reclamtionRequest).subscribe((res:any)=>{
      Swal.fire({
        text:"Reclamation traitée",
        icon:"success"
      })
      this.apiService.send_notification2(this.idreclamtion).subscribe(res=>{
        console.log('res notification',res)
      })
      console.log('traitement',res)
      this.get_all_reclamations()
    })
  }


  isAdmin(){
    return localStorage.getItem('role')=="ADMIN" ? true : false 
  
   }

}

