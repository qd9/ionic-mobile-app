import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
import { ContactInfoPage } from '../contact-info/contact-info';
import { ChangePasswordPage } from '../change-password/change-password';
import { AccountShowhidePage } from '../account-showhide/account-showhide';
import { AccountNicknamePage } from '../account-nickname/account-nickname';
import { SharedLocalStorageProvider } from "../../providers/shared-local-storage/shared-local-storage";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public stayLoggedIn:boolean;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public localStorage: SharedLocalStorageProvider) {
    this.localStorage.sharedLocalStorageData.subscribe(res=>{
      console.log('bootstrap stayLoggedIn', res);
      this.stayLoggedIn = res;
    })
  }

  helpPopUp() {
    let alert = this.alertCtrl.create({
      title: 'Stay Logged On',
      subTitle: 'Stay Logged On allows you to quickly pick up where you left off if you get a call or open another app. If you do not relaunch the application within 10 minutes you will be automatically logged off. If this is a shared device, or if you have reservations about Multitasking, you can turn off this feature.',
      buttons: ['OK']
    });
    alert.present();
  }

  notificationPopUp(){
    let alert = this.alertCtrl.create({
      title: 'Notifications',
      subTitle: 'When you set your Notifications to "on", we can notify you when certain account conditions occur - even when you are not running the PedFed app.',
      buttons: ['OK']
    });
    alert.present();
  }

  goToContactInfoPage() {
    this.navCtrl.push(ContactInfoPage);
  }
  goToChangePasswordPage(){
    this.navCtrl.push(ChangePasswordPage);
  }
  toggleStayLoggedIn(e){
    // Bind to the event value rather than the native object, because it causes a loop trying to decifer between a slide toggle and a click.
    this.stayLoggedIn = e.value;
    this.localStorage.setValue('stayLoggedIn', this.stayLoggedIn);
  }
  goToAccountShowhide(){
    console.log("RM inside ---> Accountshow hide page")
      this.navCtrl.push(AccountShowhidePage);
    }
  goToAccountNickname(){
    this.navCtrl.push(AccountNicknamePage);
  }

}
