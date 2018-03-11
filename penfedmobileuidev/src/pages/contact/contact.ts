import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { AfbaDisclosurePage } from '../../pages/afba-disclosure/afba-disclosure';
/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  fromLogin:Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fromLogin=this.navParams.get('fromLogin');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  backToLogin() {
    this.navCtrl.push(LoginPage);
  }

  gotoTermsAndConditions() {
    console.log("Inside methdo");
    this.navCtrl.push(TermsConditionsPage);
  }

  gotoAFBADisclosure(){
    this.navCtrl.push(AfbaDisclosurePage);
  }

}
