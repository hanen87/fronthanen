import { GenralDataService } from './../../controllers/genral-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-param-applications',
  templateUrl: './param-applications.component.html',
  styleUrls: ['./param-applications.component.scss']
})
export class ParamApplicationsComponent implements OnInit {
  submitted = false;
  form:FormGroup
  constructor(private apiService:GenralDataService,
     private formBuilder : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nom: ['', Validators.required],
      propretaire: ['', Validators.required],
      profil: ['', Validators.required],

    });
  }
  get f() { return this.form.controls; }
  
  saveApplication(){
    this.submitted = true;
    if (this.form.invalid) {
      console.log("err de validation",this.form.value)
        
       return;
    }
    this.apiService.save_application(this.form.value).subscribe(res=>{
      console.log('res type',res)
      Swal.fire('Application is added','success')
    })
  }

  reset(){
    this.form.reset()
  }

}
