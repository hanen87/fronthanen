import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

  demande_attestations:any
  user_connect=JSON.parse(localStorage.getItem('current_user')!)

  constructor(private apiService:GenralDataService) { }

  ngOnInit() {
    this.get_all_demande_attestations()
  } 

  get_all_demande_attestations(){
    this.apiService.get_all_demande_attestations().subscribe((res:any)=>{
      console.log('demandes attestations ',res)
       this.demande_attestations=res.filter((el:any)=>el.lignes[0].demandeur.id==this.user_connect.id)
      console.log('demandes attestations ',this.demande_attestations)

    })
  }

}
