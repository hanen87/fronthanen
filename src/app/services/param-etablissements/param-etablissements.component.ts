import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-param-etablissements',
  templateUrl: './param-etablissements.component.html',
  styleUrls: ['./param-etablissements.component.scss']
})
export class ParamEtablissementsComponent implements OnInit {

  form:FormGroup
  gestionnaires:any
  etablissements:any
  constructor(private apiService:GenralDataService,
     private formBuilder : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      gestionnaire: ['', Validators.required]
    });

    this.get_All_Gestionnaires()
    this.get_All_Etablissement()
  }
  
  AffecterGestionnaire(){
    this.apiService.Affecter_Gestionnaire_Etablissement(this.form.value).subscribe(res=>{
      console.log('res type',res)
      Swal.fire('Application is added','success')
    })
  }

  reset(){
    this.form.reset()
  }

  get_All_Gestionnaires(){
    this.apiService.get_All_Gestionnaire().subscribe(res=>{
      console.log('res',res)
      this.gestionnaires=res
    })
  }
  get_All_Etablissement(){
    this.apiService.get_All_Etablissement().subscribe(res=>{
      console.log('res',res)
      this.etablissements=res
    })
  }
}
