import { Component, Renderer } from '@angular/core';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { DepositsAgreementPage } from '../../pages/deposits-agreement/deposits-agreement';
import { NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TermsConditionsPopupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'terms-conditions-popup',
  templateUrl: 'terms-conditions-popup.html'
})
export class TermsConditionsPopupComponent {

  constructor(public renderer: Renderer, public viewCtrl: ViewController,
    private navCtrl: NavController, private localStorage: Storage) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    console.log(' working');
  }


  terms() {
    this.navCtrl.push(TermsConditionsPage);
  }
  deposit() {
    console.log('deposit screen');
    this.navCtrl.push(DepositsAgreementPage);
  }
  setTCLocalStorage() {
    this.localStorage.ready().then(() => {
      this.localStorage.set("TCFlag", true);
    });
  }
  accept() {
    let user: any;
    this.setTCLocalStorage();
    this.localStorage.get('firstTimeUser').then((data) => {
      user = data;
    });
    let data = { 'readonly': true, 'userName': user, 'acceptence': true };
    this.viewCtrl.dismiss(data);
  }
}
