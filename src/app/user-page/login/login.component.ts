import { LoginRequest } from './../../models/login-request';
import { AuthentificationService } from './../../controllers/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  submitted = false;
  roles: any
  loginRequest= new LoginRequest()

  constructor(private apiauth: AuthentificationService,
     private route: Router,
      private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() { return this.LoginForm.controls; }

  login() {
    this.submitted = true;
    this.loginRequest.username=this.LoginForm.value.username
    this.loginRequest.password=this.LoginForm.value.password
    if (this.LoginForm.invalid) {
      console.log(this.LoginForm.value)
      return;
    }
    this.apiauth.Login(this.loginRequest).subscribe((res: any) => {
      console.log('res',res)
      if (res !== null) {
        localStorage.setItem("loginIn","true");
        localStorage.setItem("role",res.user.profil)
        localStorage.setItem("service","0");

        localStorage.setItem("token",JSON.parse(JSON.stringify(res)).access_token);
        localStorage.setItem("current_user", JSON.stringify(res.user));
        // Swal.fire({
        //   title: 'success',
        //   icon: 'success',
        //   text: 'Authentification Successufly',
        //   footer: '<a href>Why do I have this issue?</a>'
        // })
        console.log(res)
        this.route.navigate(['/page'])
        // const jwt = res['access_token']
        // var decoded: any = jwt_decode(jwt);
        // console.log('decoded', decoded)
        // localStorage.setItem("role", JSON.stringify(decoded.role))
      }
    }
      , (err) => {
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Authentification Failed',
            footer: '<a href>Why do I have this issue?</a>'
          })
        }
      }
    )
  }




}
