import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-detaildemandeit',
  templateUrl: './detaildemandeit.component.html',
  styleUrls: ['./detaildemandeit.component.scss']
})
export class DetaildemandeitComponent implements OnInit {

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  demandes_it:any[]=[]
  status_selected:Date
  id=this.activeroute.snapshot.params.id
  constructor(private apiService:GenralDataService,
    
    private activeroute:ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.get_mes_demandes_it()
  }
  
  get_mes_demandes_it(){  
      this.apiService.get_All_demandes_It().subscribe((res:any)=>{
        this.demandes_it=res.filter((el:any)=>el.id==this.id)[0]  
        console.log('reponse of demande_it',this.demandes_it)    

           })

  }

}
