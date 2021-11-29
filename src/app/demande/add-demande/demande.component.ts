import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

  form:FormGroup
  constructor(private apiService:GenralDataService, private fb:FormBuilder) { }
    // this.form= this.fb.group({

    // })
  
  ngOnInit() {} 

  // save_demande_attestations(){
  //   this.apiService.get_all_demande_attestations().subscribe((res:any)=>{
  //     console.log('reponse add reclamation ',res)
  //   })
  // }
  // save_ligne_demande_attestation(){
  //   data={
  //      type:"ddd"  
  //      lignes:"fff"
  //      motif:"ffff"
  //      date:"dddd"
  //      date_signature_contrat:"dddd"
  //      reference:"ffffff"
  //   }
  //   this.apiService.save_ligne_demande_attestation(data.id,data.id,data).subscribe((res:any)=>{
     
  //     console.log('reponse add reclamation ',res)
  //   })
  // }
   


}
