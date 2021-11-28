import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../controllers/authentification.service';
import { GenralDataService } from '../controllers/genral-data.service';

@Component({
selector: 'app-registre',
templateUrl: './registre.component.html',
styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {

RegisterForm: FormGroup;
submitted = false;
etablissements:any
constructor(private formBuilder: FormBuilder,private apiService:GenralDataService,private route:Router, private apidata:AuthentificationService
,) { }

ngOnInit(): void {
this.get_all_Etablissement()
this.RegisterForm = this.formBuilder.group({
username: ['', Validators.required],
password: ['', Validators.required],
firstName: ['', Validators.required],
lastName: ['', Validators.required],
matricule: ['', Validators.required],
fonction: ['', Validators.required],
// magasin: ['', Validators.required],
date_contrat: ['', Validators.required],
id_etablisement: ['', Validators.required],
equipe: [''] ,
profil: ['', Validators.required],



});
}
get f() { return this.RegisterForm.controls; }


onSubmit() {
this.submitted = true;

// stop here if form is invalid
if (this.RegisterForm.invalid) {
console.log("err de validation",this.RegisterForm.value)
return;

}








// display form values on success

this.apidata.Register(this.RegisterForm.value,this.RegisterForm.value.id_etablisement).subscribe(res=>{
console.log(res)
Swal.fire(
'user added !',
'success'
)
this.route.navigateByUrl('/page')
})
}
isGRH(){
return this.RegisterForm.value.profil=="GRH" ? true : false
}

get_all_Etablissement(){
this.apiService.get_All_Etablissement().subscribe(res=>{
console.log('all etablissements',res)
this.etablissements=res
})
}

}
