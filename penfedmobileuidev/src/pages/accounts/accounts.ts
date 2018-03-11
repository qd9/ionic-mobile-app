import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController,NavParams } from 'ionic-angular';
import { ApiService} from '../../providers/api-service';
import { AccountShowhidePage} from '../account-showhide/account-showhide';
import { ResetAccountsDataProvider } from "../../providers/reset-accounts-data/reset-accounts-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { SharedLocalStorageProvider } from "../../providers/shared-local-storage/shared-local-storage";
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { Storage } from '@ionic/storage';
import { SessionManager } from '../core/session-manager';
/**
 * Generated class for the AccountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts: any = [];
  public checkSaveAccountsAsOfDate: string;
  public reditCardAccounts: any = [];
  public reditCardAccountsAsOfDate: string;
  public loanAccounts: any = [];
  public loanAccountsAsOfDate: string;
  public mortgageAccounts: any = [];
  public mortgageAccountsAsOfDate: string;
  public iraAccounts: any = [];
  public iraAccountsAsOfDate: string;
  public certificateAccounts: any = [];
  public certificateAccountsAsOfDate: string;
  public hideAccounts:any = {};
  public hideHiddenAccountsMessage:boolean = true;
  public loading: any;
  private sessionManager:any;

  constructor(public navCtrl: NavController, public api: ApiService, public zone: NgZone,
    public loadingCtrl: LoadingController, public resetAccounts: ResetAccountsDataProvider,
    public accountsApi: AccountsServiceProvider, public localStorage: SharedLocalStorageProvider,
    public alertCtrl: AlertController, 
    public localStoragePlugin: Storage, public contactInfo: ContactInformationProvider,
    private navParams: NavParams) {

    this.sessionManager = SessionManager.singletonInstance();
   
    //TODO - Don't call below method from constructor
    this.loadAccounts();

    this.resetAccounts.getResetEvent().subscribe(res => {
      this.checkSaveAccounts.length = 0;
      this.checkSaveAccountsAsOfDate = null;
      this.loanAccounts.length = 0;
      this.loanAccountsAsOfDate = null;
      this.reditCardAccounts.length = 0;
      this.reditCardAccountsAsOfDate = null;
      this.mortgageAccounts.length = 0;
      this.mortgageAccountsAsOfDate = null;
      this.iraAccounts.length = 0;
      this.iraAccountsAsOfDate = null;
      this.certificateAccounts.length = 0;
      this.certificateAccountsAsOfDate = null;
    });
    this.localStorage.getValue('stayLoggedIn');
  }

  goToAccountShowhide() {
    this.navCtrl.push(AccountShowhidePage);
  }

  private loadAccounts(){
    let refreshData  = this.navParams.get('refreshData');
    if (refreshData == null || refreshData == true){
      this.loading = this.loadingCtrl.create({
        content: 'Loading Accounts...',
        spinner: 'crescent'
      });
      this.loading.present();
      this.accountsApi.getCombinedAccounts().subscribe(res => {
      this.sessionManager.accountsList=res.accountData;
      this.sessionManager.IRAAccounts=res.iraCertificateData;
      this.updateLocalObjects();
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
    } else {
      this.updateLocalObjects();
    }
  }

  private updateLocalObjects(){
    this.checkSaveAccounts = this.sessionManager.accountsList.checkSaveAccounts || [];
    this.checkSaveAccountsAsOfDate = this.checkSaveAccounts.length ? this.checkSaveAccounts[0].asOfDate : null;
    this.hideAccounts.checkSaveAccounts = this.checkSaveAccounts.length ? this.checkSaveAccounts.every(this.hideGroup): true;

    this.loanAccounts = this.sessionManager.accountsList.loanAccounts || [];
    this.loanAccountsAsOfDate = this.loanAccounts.length ? this.loanAccounts[0].asOfDate : null;
    this.hideAccounts.loanAccounts = this.loanAccounts.length ? this.loanAccounts.every(this.hideGroup): true;

    this.reditCardAccounts = this.sessionManager.accountsList.creditCardAccounts || [];
    this.reditCardAccountsAsOfDate = this.reditCardAccounts.length ? this.reditCardAccounts[0].asOfDate : null;
    this.hideAccounts.reditCardAccounts = this.reditCardAccounts.length ? this.reditCardAccounts.every(this.hideGroup): true;

    this.mortgageAccounts = this.sessionManager.accountsList.mortgageAccounts || [];
    this.mortgageAccountsAsOfDate = this.mortgageAccounts.length ? this.mortgageAccounts[0].asOfDate : null;
    this.hideAccounts.mortgageAccounts = this.mortgageAccounts.length ? this.mortgageAccounts.every(this.hideGroup): true;
            
    
    this.iraAccounts = this.sessionManager.IRAAccounts.iraAccounts || [];
    this.iraAccountsAsOfDate = this.iraAccounts.length ? this.iraAccounts[0].asOfDate : null;
    this.hideAccounts.iraAccounts = this.sessionManager.accountsList.showIRA ? false : true;

    this.certificateAccounts = this.sessionManager.IRAAccounts.certificateAccounts || [];
    this.certificateAccountsAsOfDate = this.certificateAccounts.length ? this.certificateAccounts[0].asOfDate : null;
    this.hideAccounts.certificateAccounts = this.sessionManager.accountsList.showMoneyMarket ? false: true;

    this.hideHiddenAccountsMessage = this.showAllAccountsFunc(this.hideAccounts);
  }

  //ViewLoad
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  } 

    // this.localStoragePlugin.get('savedUser').then((data) => {
    //   if (data != null) {
    //     this.contactInfo.getContactInfo().subscribe(res => {
    //       let result = res.json();
    //       console.log(result);
    //       if (result.userDisplayName != null) {
    //         this.zone.run(() => {
    //           this.contactInfo.userName = result.userDisplayName.split(' ').slice(0, -1).join(' ')
    //           this.localStoragePlugin.set("formattedFirstName", this.contactInfo.userName);
    //         });
    //       } else {
    //         console.error("Not able to retrieve contact information from backend..!");
    //         //this.localStoragePlugin.set("formattedFirstName","Customer");
    //       }
    //     });
    //   }
    // });

  ionViewWillLeave() {
      // this.localStoragePlugin.get('savedUser').then((data) => {
      //   if (data != null) {
      //     this.contactInfo.getContactInfo().subscribe(res => {
      //       let result = res.json();
      //       console.log(result);
      //       if (result.userDisplayName != null) {
      //         this.zone.run(() => {
      //           this.contactInfo.userName = result.userDisplayName.split(' ').slice(0, -1).join(' ')
      //           this.localStoragePlugin.set("formattedFirstName", this.contactInfo.userName);
      //         });
      //       } else {
      //         console.error("Not able to retrieve contact information from backend..!");
      //         //this.localStoragePlugin.set("formattedFirstName","Customer");
      //       }
      //     });
      //   }
      // });
  }

  hideGroup(element){
    return element.showAccount===false;
  }

  showAllAccountsFunc(accountGroup){
    let resp:any[] = [];
    for (var key in accountGroup) {
      if (accountGroup.hasOwnProperty(key)) {
        var element = accountGroup[key];
        console.log(element);
        resp.push(element)
      }
    }
    let hideAll = resp.every(indx=>indx===true)
    return !hideAll;
  }

}
