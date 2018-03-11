import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CreateNewpasswordPage } from '../create-newpassword/create-newpassword';

/**
 * Generated class for the AccountUnlockedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-unlocked',
  templateUrl: 'account-unlocked.html',
})
export class AccountUnlockedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountUnlockedPage');
  }

  popView() {
    this.navCtrl.pop();
  }
  backToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
  goToSetPasswordPage() {
    this.navCtrl.push(CreateNewpasswordPage);
  }
}
