import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnlockAccountPage } from '../unlock-account/unlock-account';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountLockedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-locked',
  templateUrl: 'account-locked.html',
})
export class AccountLockedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  popView() {
    this.navCtrl.pop();
  }

  goToUnlockPage() {
    this.navCtrl.push(UnlockAccountPage);
  }
  backToLoginPage(){
    this.navCtrl.push(LoginPage);
  }
}
