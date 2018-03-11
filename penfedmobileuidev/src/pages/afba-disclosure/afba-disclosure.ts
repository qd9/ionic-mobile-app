import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactPage } from '../../pages/contact/contact';
/**
 * Generated class for the AfbaDisclosurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-afba-disclosure',
  templateUrl: 'afba-disclosure.html',
})
export class AfbaDisclosurePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfbaDisclosurePage');
  }

  backToContactPage() {
    this.navCtrl.push(ContactPage, {
      fromLogin: true
    });
  }

}
