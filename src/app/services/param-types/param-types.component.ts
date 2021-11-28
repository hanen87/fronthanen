import { GenralDataService } from './../../controllers/genral-data.service';
import { GeneratedFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-param-types',
  templateUrl: './param-types.component.html',
  styleUrls: ['./param-types.component.scss']
})
export class ParamTypesComponent implements OnInit {
  form:FormGroup
  actifs:any
  constructor(private apiService:GenralDataService,
     private formBuilder : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      libelle: ['', Validators.required],
      categorie: ['', Validators.required],
    });
    this.get_Actifs()
  }
  get_Actifs(){
    this.apiService.get_all_actifs().subscribe(res=>{
      this.actifs=res
      console.log('res actifs',res)
    })
  }
  
  saveType(){
    this.apiService.save_typeActif(this.form.value).subscribe(res=>{
      console.log('res type',res)
      Swal.fire('added','success')
    })
  }

  reset(){
    this.form.reset()
  }
  
} 
