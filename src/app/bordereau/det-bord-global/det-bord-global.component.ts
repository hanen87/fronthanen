import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-det-bord-global',
  templateUrl: './det-bord-global.component.html',
  styleUrls: ['./det-bord-global.component.scss']
})
export class DetBordGlobalComponent implements OnInit {

  bordereau:any
  uniqueArr:any
  ligne:any
  user_connect=JSON.parse(localStorage.getItem('current_user')!)

  id=this.routeactive.snapshot.params.id
  constructor(private apiService:GenralDataService, private routeactive:ActivatedRoute) { }

  ngOnInit() {
    this.get_one_bordereau()
  } 

  get_one_bordereau(){
    this.apiService.get_all_Bordeaux().subscribe((res:any)=>{
       this.bordereau=res.filter((el:any)=>el.id==this.id)[0]
       console.log('one bordeaur ',this.bordereau)
       this.ligne= this.bordereau.sousbordeaur.map((el:any)=>{return el.lignes.map((el)=>{return el.id})}).reduce((acc, val) => acc.concat(val), [])
       this.uniqueArr = [...new Set(this.ligne)]
      console.log("lignes",this.uniqueArr)
    })
  }

   
    annuler_Bordereau(){

      for (let i=0; i<this.uniqueArr.length;i++){
        console.log('ggggg')
        this.apiService.valider_ligne_demande(this.user_connect.id,this.uniqueArr[i]).
        subscribe(res=>{
              console.log('res of envoyer',res)
        })
    } 
      this.apiService.annuler_borderau(this.id).subscribe(res=>{
        console.log('annulation bordereau',res)

        Swal.fire({
          text:'borderau est annulé',
          icon:'success'
        })
      })
    }
    

    isAdmin() {
      return localStorage.getItem('role') == "ADMIN" ? true : false

  }


}
