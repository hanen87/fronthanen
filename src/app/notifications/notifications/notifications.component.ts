import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  notifications:any[]=[]
  constructor(private route:Router, private apiservice:GenralDataService) { }

  ngOnInit() {
    this.getAll_notifications()
  }
   

  getAll_notifications(){
    this.apiservice.get_all_notification().subscribe((res:any)=>{
      console.log('res notifications',res)
      this.notifications=res.filter((el:any)=>el.ligne.demandeur.id==this.user_connect.id) 
      console.log('my notifications', this.notifications)
    })
  }



  
}
