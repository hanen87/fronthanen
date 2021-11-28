import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenralDataService {

  constructor( private http: HttpClient) {}

  save_application(AppData:any){
    return this.http.post(`${environment.baseurl}/users/applications/save`, AppData)
  }

  get_All_application(){
    return this.http.get(`${environment.baseurl}/users/applications/all`)
  }

  get_all_actifs(){
    return this.http.get(`http://localhost:8081/users/actifs/all`)
  } 

  save_typeActif(ActifData:any){
    return this.http.post(`${environment.baseurl}/users/types/save`, ActifData)

  }

  get_All_typeActif(){
    return this.http.get(`${environment.baseurl}/users/types/all`)

  }
  
  get_All_Gestionnaire(){
    return this.http.get(`${environment.baseurl}/users/gestionnaires/all`)

  } 

  save_Etablissement(EtablissementData:any){
    return this.http.post(`${environment.baseurl}/users/etablissements/save`, EtablissementData)

  }

  get_All_Etablissement(){
    return this.http.get(`${environment.baseurl}/users/etablissements/all`)
  }

  
  Affecter_Gestionnaire_Etablissement(IdGestionnaire:any){
    return this.http.put(`${environment.baseurl}/users/etablissements/save/${IdGestionnaire}`, {})
  }
 
    
  get_all_reclamations(){
    return this.http.get(`${environment.baseurl}/users/reclamations/all`)
  }

  save_reclamation(idEmploye:any,idEtablissement:any,idnature:any,ReclamationData:any){
    return this.http.post(`${environment.baseurl}/users/reclamations/save/${idEmploye}/${idEtablissement}/${idnature}`,ReclamationData)
  }

  get_all_natures(){
    return this.http.get(`${environment.baseurl}/users/natureReclamtions/all`)
  }

  traiter_reclamation(idReclamation:any,data){
    return this.http.put(`${environment.baseurl}/users/reclamations/traiter/${idReclamation}`,data)
  }
  get_All_reclamation(){
    return this.http.get(`${environment.baseurl}/users/reclamations/all`)
  }

  get_All_demandes_It(){
    return this.http.get(`${environment.baseurl}/users/accessApplications/all`)
  }
  get_All_demandes_Actif(){
    return this.http.get(`${environment.baseurl}/users/accessActifs/all`)
  }

  save_demande_Actif(iduser:any,DemandeActif:any,ids){
    return this.http.post(`${environment.baseurl}/users/accessActifs/save/${iduser}`,
    DemandeActif,   
    {params:{"ids":ids}})
  }

  save_demande_It(iduser:any,DemandeIt:any,ids:any){
    return this.http.post(`${environment.baseurl}/users/accessApplications/save/${iduser}`,
    DemandeIt, {params:{"ids":ids}})
  }

  get_all_demande_attestations(){
    return this.http.get(`${environment.baseurl}/users/demandeattestations/all`)
  }

  save_demande_attestations(DataDemande:any,a){
    return this.http.post(`${environment.baseurl}/users/demandeattestations/save`,DataDemande,
    {params:{"ids":a}})
  } 

  get_all_Bordeaux(){
    return this.http.get(`${environment.baseurl}/users/bordereaux/all`)
  }

  save_Bordeaux(idbo:any,DataBordeau:any,ids){
    return this.http.post(`${environment.baseurl}/users/bordereaux/save/${idbo}`,
    DataBordeau, {params:{"ids":ids}})
  }

  get_all_Sous_Bordeaux(){
    return this.http.get(`${environment.baseurl}/users/sousbordereaux/all`)
  }

  save_Sous_Bordeaux(DataBordeau:any,ids:any){
    return this.http.post(`${environment.baseurl}/users/sousbordereaux/save`,DataBordeau,{params:{"ids":ids}})
  }

  save_ligne_demande_attestation(iduser:any,DemandeAttestationData:any){
      return this.http.post(`${environment.baseurl}/users/ligneattestation/save/${iduser}`,DemandeAttestationData)
    }
  
  delete_ligne_demande_attestation(idligne:any){
      return this.http.delete(`${environment.baseurl}/users/ligneattestation/delete/${idligne}`)
    }
  push_ligne_demande(idattestation:any,idligne:any){
      return this.http.post(`${environment.baseurl}/users/demandeattestations/addtolignes/${idattestation}/${idligne}`,{})
  }

  annuler_ligne_demande(iduser:any,idligne:any,dataAnnulation:any){
    return this.http.put(`${environment.baseurl}/users/ligneattestation/annuler/${idligne}/${iduser}`,dataAnnulation)
}
valider_ligne_demande(iduser:any,idligne:any){

  return this.http.put(`${environment.baseurl}/users/ligneattestation/valider/${idligne}/${iduser}`,{})
}

get_all_ligne_demande_attestation(){
  return this.http.get(`${environment.baseurl}/users/ligneattestation/all`)
}

delete_accesit(id:any){
  return this.http.delete(`${environment.baseurl}/users/accessligneapplication/delete/${id}`)
} 

annuler_sous_borderau(idsb:any){
  return this.http.put(`${environment.baseurl}/users/sousbordereaux/annuler/${idsb}`,{})
}

generer_sous_borderau(idsb:any){
  return this.http.put(`${environment.baseurl}/users/sousbordereaux/generer/${idsb}`,{})
}


getone_user(matricule:any){
  return this.http.get(`${environment.baseurl}/users/getone?matricule=${matricule}`)
}


save_ligne_demande_application(iduser:any,idapplication:any,DataApplication:any){
  return this.http.post(`${environment.baseurl}/users/accessligneapplication/save/${iduser}/${idapplication}`,
  DataApplication)
}


save_ligne_demande_actif(iduser:any,idactif:any,DataActif:any){
  return this.http.post(`${environment.baseurl}/users/accessactifligne/save/${iduser}/${idactif}`,
  DataActif)
}

  
delete_ligne_demande_application(idligne:any){
  return this.http.delete(`${environment.baseurl}/users/accessligneapplication/delete/${idligne}`)
} 

valider_demande_application(idligne:any){
  return this.http.put(`${environment.baseurl}/users/accessApplications/valider/${idligne}`,{})
} 


annuler_demande_application(idligne:any){
  return this.http.put(`${environment.baseurl}/users/accessApplications/annuler/${idligne}`,{})
} 


get_all_demande_ligne_application(){
  return this.http.get(`${environment.baseurl}/users/accessligneapplication/all`,{})
} 

send_notification(idligne:any){
  return this.http.post(`${environment.baseurl}/users/notifications/save/${idligne}`,{"date": new Date()})
} 
send_notification1(idligne:any){
  return this.http.post(`${environment.baseurl}/users/notifications/save1/${idligne}`,{"date": new Date()})
} 

send_notification2(idreclamation:any){
  return this.http.post(`${environment.baseurl}/users/notificationreclamation/save/${idreclamation}`,{"date": new Date()})
} 


get_all_notification(){
  return this.http.get(`${environment.baseurl}/users/notifications/all`)
} 
get_all_notification1(){
  return this.http.get(`${environment.baseurl}/users/notificationreclamation/all`)
} 

get_all_users(){
  return this.http.get(`${environment.baseurl}/users/All`)
} 


annuler_borderau(idborderau:any){
  return this.http.put(`${environment.baseurl}/users/bordereaux/annuler/${idborderau}`,{})
}

initier_ligne_demande_attestation(idligne:any,idvalidateur:any){
  return this.http.put(`${environment.baseurl}/users/ligneattestation/initier/${idligne}/${idvalidateur}`,
  {})
}

envoyer_ligne_demande_attestation(idligne:any,idvalidateur:any){
  return this.http.put(`${environment.baseurl}/users/ligneattestation/envoyer/${idligne}/${idvalidateur}`,{})
}


sendEmail(data:any){
  return this.http.post(`${environment.baseurl}/users/sendMail`,data)
}

}
