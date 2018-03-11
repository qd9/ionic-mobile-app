import { Component } from '@angular/core';
import { NavParams, NavController, ModalController, AlertController, Platform } from "ionic-angular";

// @Component({
//   selector:'ncua-cert',
//   template:`<h1> Federally Insured by NCUA`
// })
// export class NCUACert{
//   constructor(public viewCtrl: ViewController){
//     console.log('Showing NCUA Certification')
//   }
// }

@Component({
  selector: 'accounts-footer',
  templateUrl: 'accounts-footer.html'
})
export class AccountsFooterComponent{
  public pfDate:object;  
  public footerParams:object;
  constructor(private platform: Platform, public navParams: NavParams, public navCtrl: NavController, public modalCtrl:ModalController,private alertCtrl: AlertController){
    this.footerParams = this.navParams;
    this.pfDate = new Date(); 
  }
  displayNCUACert(){
    // TODO: Build Modal to show NCUA Insured Certification
    //console.log('TODO: Build Modal to show NCUA Insured Certification');
    // let ncuaCert = this.modalCtrl.create(NCUACert);
    // ncuaCert.present();  
    let msg='<div class="alertBorder"><div class="alertmsg"><p>Your savings federally insured to at least $250,000 and backed by the full faith and credit of the United States Government</p><h4 class="font-effect-emboss">NCUA</h4><p>National Credit Union Administration, a U.S.Government Agency</p></div></div>';
    let alert = this.alertCtrl.create({     
        title: "",
        subTitle: msg,
        cssClass: 'ncua-alert',
        buttons: [
            {
            text: 'OK',
            role: 'OK'
            }
        ]
    });
    alert.present();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
  }
}
