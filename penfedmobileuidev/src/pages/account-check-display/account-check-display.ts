import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";

/**
 * Generated class for the CheckDisplayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-check-display',
  templateUrl: 'account-check-display.html',
})
export class AccountCheckDisplayPage {
  public pageNameParam:any;
  public checkImageData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountApi: AccountsServiceProvider) {
    this.pageNameParam = this.navParams.data;
    this.accountApi.getCheckImage(this.pageNameParam.accountMask, this.pageNameParam.payload.amount, this.pageNameParam.payload.checkNumber,  this.pageNameParam.payload.postedDate).subscribe(res=>{
      this.checkImageData = res;
      console.log(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCheckDisplayPage');
  }

}
