import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { AccountUnlockedPage } from '../account-unlocked/account-unlocked';

/**
 * Generated class for the UnlockAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unlock-account',
  templateUrl: 'unlock-account.html',
})
export class UnlockAccountPage {
  unlockAccountForm: FormGroup;
  changePasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public alertCtrl: AlertController) {
    this.unlockAccountForm = fb.group({
      username: ['', [Validators.required]],
      code: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    })
  }

  popView() {
    this.navCtrl.pop();
  }

  helpPopUp() {
    let alert = this.alertCtrl.create({
      title: 'Security Code',
      subTitle: 'The PenFed Security Code, a 4 to 6 digit number, is a new feature that lets you securely update account information. To protect your identity, this code is unique and will verify that you are who you say you are. This value is initially the same as your PIN and can be changed on PenFed.org.',
      buttons: ['OK']
    });
    alert.present();
  }
  goToUnlockPage() {
    this.navCtrl.push(AccountUnlockedPage);
  }
}
