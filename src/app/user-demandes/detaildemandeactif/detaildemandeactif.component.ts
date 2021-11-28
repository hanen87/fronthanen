import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';

@Component({
  selector: 'app-detaildemandeactif',
  templateUrl: './detaildemandeactif.component.html',
  styleUrls: ['./detaildemandeactif.component.scss']
})
export class DetaildemandeactifComponent implements OnInit {

  user_connect=JSON.parse(localStorage.getItem('current_user')!)
  demandes_actif:any[]=[]
  status_selected:Date
  id=this.activeroute.snapshot.params.id
  constructor(private apiService:GenralDataService,
    
    private activeroute:ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.get_mes_demandes_actif()
  }
  
  get_mes_demandes_actif(){  
      this.apiService.get_All_demandes_Actif().subscribe((res:any)=>{
        this.demandes_actif=res.filter((el:any)=>el.id==this.id)[0]  
        console.log('reponse of demande_actif',this.demandes_actif)    

           })

  }

}
