import { Component, OnInit } from '@angular/core';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-sous-bordereau',
  templateUrl: './sous-bordereau.component.html',
  styleUrls: ['./sous-bordereau.component.scss']
})
export class SousBordereauComponent implements OnInit {
  
  demande_attestations:any
  bordereaux:any[]=[]
  etablissement_selected:any
  etablissements:any
  constructor(private apiService:GenralDataService) { }

  ngOnInit() {
    this.get_all_bordereaux()
    this.get_all_Etablissement()
  } 
   get_all_bordereaux(){
    this.apiService.get_all_Bordeaux().subscribe((res:any)=>{
      console.log('liste bordeaureaux ',res)
       this.bordereaux=res
    })
  }
  filter_by_etablisement(){
    if(this.etablissement_selected==="All"){ 
    console.log('status',this.etablissement_selected)
    this.apiService.get_all_Sous_Bordeaux().subscribe((res:any)=>{
     this.bordereaux=res   

        })
      }
      else{
        console.log('status',this.etablissement_selected)
        this.apiService.get_all_Sous_Bordeaux().subscribe((res:any)=>{
            this.bordereaux=res   
            this.bordereaux=this.bordereaux.filter(el=>el.etablissement===this.etablissement_selected) 
       
               })  
      }
    }
    get_all_Etablissement(){
      this.apiService.get_All_Etablissement().subscribe(res=>{
        console.log('all etablissements',res)
        this.etablissements=res
     })
    }

}
