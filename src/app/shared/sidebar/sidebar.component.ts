import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  
  constructor() { }

  ngOnInit() {
  }

  isRH(){
   return localStorage.getItem('service')==='0'? true: false
  }

  isIT(){
   return localStorage.getItem('service')==='1'? true: false
  }

  isGRH(){
  return localStorage.getItem('role')=="GRH" ? true : false 
 }
 
 isAdmin(){
  return localStorage.getItem('role')=="ADMIN" ? true : false 

 }

 isBO(){
  return localStorage.getItem('role')=="BureauOrdre" ? true : false 
 }

 isEmployee(){
  return localStorage.getItem('role')=="Employee" ? true : false 

 }

}
