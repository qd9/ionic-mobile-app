import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { ApiService} from '../../providers/api-service';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';

/**
 * Generated class for the AccountNicknamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-nickname',
  templateUrl: 'account-nickname.html',
})
export class AccountNicknamePage {
  public loading:any;
  public checkSaveAccounts: any = [];
  public reditCardAccounts: any = [];
  public loanAccounts: any = [];
  public mortgageAccounts: any = [];
  public iraAccounts: any = [];
  public certificateAccounts: any = [];
  public hideAccounts:any = {};
  public hideHiddenAccountsMessage:boolean = true;

  public arr0:any = [];
  public arr1:any = [];
  public arr2:any = [];
  public arr3:any = [];
  public arr4:any = [];
  public arr5:any = [];

  public array:any;
  public array1:any;


  constructor(public navCtrl: NavController, public api: ApiService,public loadingCtrl: LoadingController,public accountsApi: AccountsServiceProvider,public alertCtrl: AlertController, public contactInfo: ContactInformationProvider) {

    this.loading = this.loadingCtrl.create({
      content: 'Loading Accounts...',
      spinner: 'crescent'
    });
    this.loading.present();

    this.accountsApi.getCombinedAccounts().subscribe(res => {
      this.checkSaveAccounts = res.accountData.checkSaveAccounts || [];
      for ( let i = 0; i< this.checkSaveAccounts.length; i++){
        console.log(this.checkSaveAccounts[i].nickname);
        this.arr0.push(this.checkSaveAccounts[i].nickname);
      }
      console.log(this.arr0)
      this.hideAccounts.checkSaveAccounts = this.checkSaveAccounts.length ? this.checkSaveAccounts.every(this.hideGroup): true;

      this.loanAccounts = res.accountData.loanAccounts || [];
      for ( let i = 0; i< this.loanAccounts.length; i++){
        console.log(this.loanAccounts[i].nickname);
        this.arr1.push(this.loanAccounts[i].nickname);
      }
      console.log(this.arr1)
      this.hideAccounts.loanAccounts = this.loanAccounts.length ? this.loanAccounts.every(this.hideGroup): true;


      this.reditCardAccounts = res.accountData.creditCardAccounts || [];
      for ( let i = 0; i< this.reditCardAccounts.length; i++){
        console.log(this.reditCardAccounts[i].nickname);
        this.arr2.push(this.reditCardAccounts[i].nickname);
      }
      console.log(this.arr2)
      this.hideAccounts.reditCardAccounts = this.reditCardAccounts.length ? this.reditCardAccounts.every(this.hideGroup): true;

      this.mortgageAccounts = res.accountData.mortgageAccounts || [];
      for ( let i = 0; i< this.mortgageAccounts.length; i++){
        console.log(this.mortgageAccounts[i].nickname);
        this.arr3.push(this.mortgageAccounts[i].nickname);
      }
      console.log(this.arr3)
      this.hideAccounts.mortgageAccounts = this.mortgageAccounts.length ? this.mortgageAccounts.every(this.hideGroup): true;

      this.iraAccounts = res.iraCertificateData.iraAccounts || [];
      for ( let i = 0; i< this.iraAccounts.length; i++){
        console.log(this.iraAccounts[i].nickname);
        this.arr4.push(this.iraAccounts[i].nickname);
      }
      console.log(this.arr4)
      this.hideAccounts.iraAccounts = res.accountData.showIRA ? false : true;

      this.certificateAccounts = res.iraCertificateData.certificateAccounts || [];
      for ( let i = 0; i< this.certificateAccounts.length; i++){
        console.log(this.certificateAccounts[i].nickname);
        this.arr5.push(this.certificateAccounts[i].nickname);
      }
      console.log(this.arr5)
      this.hideAccounts.certificateAccounts = res.accountData.showMoneyMarket ? false: true;

    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Sorry.',
        cssClass: 'myPopup',
        subTitle: 'Data Cannot be loaded at this time',
        buttons: ['Ok']
      });
      alert.present();
    }, () => {
      this.loading.dismiss();
    });
  }

  hideGroup(element){
    return element.showAccount===false;
  }

  popView(){
    this.navCtrl.pop();
  }
  onSubmit(){
    console.log(this.array);
    console.log(this.array1)
    // this.accountsApi.updateNickName(this.checkSaveAccounts[0].accountMask,this.checkSaveAccounts[0].nickname).subscribe(()=>{
    //   console.log("success");
    // });
  }

}
