import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-edit-bord-global',
  templateUrl: './edit-bord-global.component.html',
  styleUrls: ['./edit-bord-global.component.scss']
})
export class EditBordGlobalComponent implements OnInit {

  bordereau:any
  sousbordereaux:any
  id=this.routeactive.snapshot.params.id
  constructor(private apiService:GenralDataService, 
    private routeactive:ActivatedRoute) { }

  ngOnInit() {
    this.get_all_bordereau()
  } 

  get_all_bordereau(){
    this.apiService.get_all_Bordeaux().subscribe((res:any)=>{
       this.bordereau=res.filter((el:any)=>el.id==this.id)[0]
       this.sousbordereaux=this.bordereau.sousbordeaur
      console.log('one bordeaur ',this.sousbordereaux)

    })
  }

  openPDF():void {
    let DATA = document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
    });     
    }
}
