import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenralDataService } from 'src/app/controllers/genral-data.service';
import Swal from 'sweetalert2';

@Component({ selector: 'app-list-sousbordereau', templateUrl: './list-sousbordereau.component.html', styleUrls: ['./list-sousbordereau.component.scss'] })
export class ListSousbordereauComponent implements OnInit {

    sous_bordereaux: any[] = []
    selected_sous_bordearux = []
    selected_sous_bordearux1 = []
    uniqueArr: any
    user_connect = JSON.parse(localStorage.getItem('current_user')!)
    etablissements: any
    form: FormGroup
    etablissement_selected: any
    etab: any
    generer:boolean
    reference = new Date().toISOString().split('T')[0].toString() + "-0000-" + Math.random().toString().substr(2, 4)

    constructor(
        private apiService: GenralDataService,
        private fb: FormBuilder,
        private route: Router,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.get_all_sous_bordereaux()
        this.form = this.fb.group({
            observation: [
                '', Validators.required
            ],
            date_courrier: ['', Validators.required],
            etablissement: ['', Validators.required]

        })

        this.get_all_Etablissement()
    }

    get_all_sous_bordereaux() {
        this.apiService.get_all_Sous_Bordeaux().subscribe((res: any) => {
            console.log('liste sous bordeaureaux ', res)
            this.sous_bordereaux = res.filter((el) => el.etat == "validé")
        })
    }

    getSelected() {

        this.selected_sous_bordearux = this.sous_bordereaux.filter(s => {
            return s.isCkecked;
        }).map((el) => {
            return el.id
        });

        this.etab = this.sous_bordereaux.filter(s => {
            return s.isCkecked;
        }).map((el) => {
            return el.etablissement
        });
        console.log("etab", this.etab)

        this.selected_sous_bordearux1 = this.sous_bordereaux.filter(s => {
            return s.isCkecked;
        }).map((el) => {
            return el.lignes.map((el) => { return el.id })
        }).reduce((acc, val) => acc.concat(val), [])

        this.uniqueArr = [...new Set(this.selected_sous_bordearux1)]

        console.log('selected borderau', this.selected_sous_bordearux);
        console.log('selected ligne', this.uniqueArr);

    }

    open(content: any) {
        for (let i = 0; i < this.etab.length; i++) {
            if (this.etab[i].includes(this.etab[i + 1]) || this.etab.length==1) {
                this.generer=true
                console.log( this.generer)
                this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
                return;
            }
            else {
            Swal.fire('Etablissement différent!')
            this.generer=false
            console.log( this.generer)
            }
        }


    }

    creer_bordeau() {
    if(this.generer){
        let dataBoreaux = {
            observation: this.form.value.observation,
            date_courrier: this.form.value.date_courrier,
            reference: this.reference,
            etablissement: this.etab[0],
            etat:"Envoyé"
        }


        for (let i = 0; i < this.uniqueArr.length; i++) {
            console.log('ggggg')
            this.apiService.envoyer_ligne_demande_attestation(this.uniqueArr[i], this.user_connect.id).
                subscribe(res => {
                    console.log('res of envoyer ', res)
                })
                this.apiService.send_notification1(this.uniqueArr[i]).subscribe(res=>{
                    console.log('res notification',res)
                  })
        }

        this.apiService.save_Bordeaux(this.user_connect.id, dataBoreaux,
            this.selected_sous_bordearux).
            subscribe((res: any) => {
                console.log('sous borderau', res)
                Swal.fire({
                    icon: 'success',
                    text: 'bordereau créé avec succès'
                })
                

                this.route.navigateByUrl(`/bordereau/detail-bord-global/${res.id}`)
            })

        }

        for (let i = 0; i < this.selected_sous_bordearux.length; i++) {
            this.apiService.generer_sous_borderau(this.selected_sous_bordearux[i])
                .subscribe(res => {
                    console.log('generer', res)
                    // Swal.fire({ text: 'Annulation  du sous bordeareau', icon: 'success' })
                })
        }

    }


    annuler_sousborderau() {

        Swal.fire({
            title: 'vous etes sur ?',
            text: "vous voulez annuler les sous bordereaux !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'oui, annuler!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.selected_sous_bordearux.length <= 0) {
                    Swal.fire({
                        text: "selectionnez les sous borderau à annuler",
                        icon: "error"
                    })
                }
                else {

                    for (let i = 0; i < this.selected_sous_bordearux.length; i++) {
                        this.apiService.annuler_sous_borderau(this.selected_sous_bordearux[i])
                            .subscribe(res => {
                                console.log('annn', res)
                                Swal.fire({ text: 'Annulation  du sous bordeareau', icon: 'success' })
                            })
                    }

                    for (let i = 0; i < this.uniqueArr.length; i++) {
                        this.apiService.initier_ligne_demande_attestation(this.uniqueArr[i], this.user_connect.id).
                            subscribe(res => {
                                console.log('res of initier ', res)
                            })
                    }
                    this.get_all_sous_bordereaux()
                }

            }
        })

    }


    get_all_Etablissement() {
        this.apiService.get_All_Etablissement().subscribe(res => {
            console.log('all etablissements', res)
            this.etablissements = res
        })
    }

    //   filter_by_etablisement(){

    //     console.log('status',this.etablissement_selected)
    //     if(this.etablissement_selected==="All"){
    //     this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{

    //      this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)


    //         })
    //       }else{
    //         this.apiService.get_all_ligne_demande_attestation().subscribe((res:any)=>{

    //           this.lignes=res.filter((el:any)=>el.equipe==this.user_connect.equipe)

    //           this.lignes=this.lignes.filter(el=>el.etablissement===this.etablissement_selected)
    //         })
    //       }
    //     }

    filter_by_etablisement() {
        if (this.etablissement_selected === "All") {
            console.log('status', this.etablissement_selected)
            this.apiService.get_all_Sous_Bordeaux().subscribe((res: any) => {
                this.sous_bordereaux = res

            })
        }
        else {
            console.log('status', this.etablissement_selected)
            this.apiService.get_all_Sous_Bordeaux().subscribe((res: any) => {
                this.sous_bordereaux = res
                this.sous_bordereaux = this.sous_bordereaux.filter(el => el.etablissement === this.etablissement_selected)

            })
        }
    }


    isGRH() {
        return localStorage.getItem('role') == "GRH" ? true : false
    }

    isAdmin() {
        return localStorage.getItem('role') == "ADMIN" ? true : false

    }

    isBO() {
        return localStorage.getItem('role') == "BureauOrdre" ? true : false
    }

}