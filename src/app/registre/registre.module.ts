import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistreComponent } from './registre.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegistreComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
