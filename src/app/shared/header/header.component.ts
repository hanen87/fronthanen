import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  notifications:any[]=[]
  notif:any=0
  notificationsvalidation:any[]=[]
  notificationsreclamation:any[]=[]


  constructor(private route:Router, private apiservice:GenralDataService) { }

  ngOnInit() {

    this.getAll_notifications()
    this.getAll_notifications1()
    this.getAll_notificationsreclamation()
    // this.getAll_notificationsreclamation()
  //  this.notif=this.notifications.length + this.notificationsvalidation.length
  //  console.log("length noti anuu",this.notifications.length)
  //  console.log("length noti vaalid",this.notificationsvalidation.length)

  //  console.log("noti",this.notif)

  }
  sidebarRH(){
    localStorage.setItem('service','0')
    this.route.navigateByUrl('/page')
  }
  sidebarIT(){
    localStorage.setItem('service','1')
    this.route.navigate(['/page'])
    // this.route.navigateByUrl('/accueil/nouvelle-demande')

  }

  isRH(){
    return localStorage.getItem('service')==='0'? true: false
   }
 
   isIT(){
    return localStorage.getItem('service')==='1'? true: false
   }
   
   logout(){
     this.route.navigateByUrl('/pages/login')
     localStorage.clear()
   }


   getAll_notifications(){
     this.apiservice.get_all_notification().subscribe((res:any)=>{
       console.log('res notifications',res)
       this.notifications=res.filter((el:any)=>el.ligne.demandeur.id==this.user_connect.id).slice(-4) 
       this.notifications=res.filter((el:any)=>el.etat=="Annulation")
       this.notif=this.notifications
       console.log('my notificationssssssssss', this.notifications)
   console.log("length noti anuu",this.notifications.length)
   this.notif=this.notifications.length


     })
   }
   getAll_notifications1(){
    this.apiservice.get_all_notification().subscribe((res:any)=>{
      console.log('res notifications',res)
      this.notificationsvalidation=res.filter((el:any)=>el.etat=="Validation")
      this.notificationsvalidation=res.filter((el:any)=>this.user_connect.id==el.ligne.demandeur.id).slice(-4) 
    //  console.log("id user",this.user_connect.id)
      console.log('my notifications validation', this.notificationsvalidation)
   console.log("length noti vaalid",this.notificationsvalidation.length)
   this.notif=this.notif+this.notificationsvalidation.length
    // this.notif=this.notificationsvalidation

    })
  }


  getAll_notificationsreclamation(){
    this.apiservice.get_all_notification1().subscribe((res:any)=>{
      console.log('res notifications',res)
      this.notificationsreclamation=res.filter((el:any)=>el.reclamation.demandeur.id==this.user_connect.id).slice(-4) 
      // this.notificationsreclamation=res.filter((el:any)=>el.etat=="Reclamation")
      console.log('my notifications reclamation', this.notificationsreclamation)
  //  console.log("length noti vaalid",this.notificationsvalidation.length)
  //  this.notif=this.notif+this.notificationsvalidation.length
  //   this.notif=this.notificationsvalidation

    })
  }

}
