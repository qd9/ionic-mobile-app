import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
/**
 * Generated class for the SecurityLockedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-security-locked',
  templateUrl: 'security-locked.html',
})
export class SecurityLockedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecurityLockedPage');
  }
  goToAccountPage() {
    this.navCtrl.push(AccountsPage);
  }
}
