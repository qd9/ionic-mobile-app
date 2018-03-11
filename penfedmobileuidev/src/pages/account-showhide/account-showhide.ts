import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { AccountsServiceProvider } from '../../providers/accounts-service/accounts-service';
//import {  AccountsPage } from '../accounts/accounts';
import * as _ from "lodash";
import { SessionManager } from '../core/session-manager';
import { CONST } from '../core/const';
import { SettingsPage } from '../settings/settings';
import { AccountsPage } from '../accounts/accounts';

/**
 * Generated class for the AccountShowhidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-showhide',
  templateUrl: 'account-showhide.html'
})
export class AccountShowhidePage {

  public loading: any;
  public accountsList: any;
  public iraAccountsList: any = {
    'iraAccounts':[],
    'certificateAccounts':[]
  };
  //private iraList: any;
  // public iraAccountsList: any;
  private actList:any;
  private iraList: any;
  //private modifiedActList: any = [];
  public showIRAAccount: boolean = false;
  public showCertificate: boolean = false;
  public IRACertificateText: string = "";
  public IRAText: string = CONST.showhideAccount.IRAText;
  public MMCText: string = CONST.showhideAccount.MMCText;
  
  public checkSaveAccountsToggleStatus: any = [];
  public loanAccountsToggleStatus: any = [];
  public mortgageAccountsToggleStatus: any = [];
  public creditCardAccountsToggleStatus: any = [];
  public externalAccountsToggleStatus: any = [];
  public IRAAccountsToggleStatus: any;
  public certificateAccountsToggleStatus: any;
  public initToggleStatus: any = [];
  public initIRAToggleStatus: any;
  public initCertificateAccountsToggleStatus: any;
  private refreshData: boolean = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, public loadingCtrl: LoadingController,
    private httpProvider: AccountsServiceProvider) {
  }

  ionViewDidLoad() {
    this.getAccountsdata();
    this.getIRAAccountsData();
  }

  ionViewDidEnter(){

  }

  //getting accounts data
  getAccountsdata() {
    let sessionManager = SessionManager.singletonInstance(); 
    this.accountsList=sessionManager.accountsList;
    this.actList = _.cloneDeep(this.accountsList);
    this.getToggleStatus(this.accountsList.checkSaveAccounts, this.checkSaveAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.creditCardAccounts, this.creditCardAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.loanAccounts, this.loanAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.mortgageAccounts, this.mortgageAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.externalAccounts, this.externalAccountsToggleStatus);
    //IRA
    this.IRAAccountsToggleStatus = this.accountsList.showIRA;
    this.certificateAccountsToggleStatus = this.accountsList.showMoneyMarket;
    this.initIRAToggleStatus = this.IRAAccountsToggleStatus;
    this.initCertificateAccountsToggleStatus = this.certificateAccountsToggleStatus;
  }

  //getting IRA accounts data
  getIRAAccountsData(): void {
    let sessionManager = SessionManager.singletonInstance(); 
    if(sessionManager.IRAAccounts !=null){
      this.iraAccountsList = sessionManager.IRAAccounts;
      this.iraList = _.cloneDeep(this.iraAccountsList);
    }

    //
    if(this.iraAccountsList.iraAccounts !=null && this.iraAccountsList.iraAccounts.length >0){
      this.showIRAAccount = true;
      this.IRACertificateText = "IRA";
    }
    
    if(this.iraAccountsList.certificateAccounts !=null && this.iraAccountsList.certificateAccounts.length >0){
      this.showCertificate = true;
      if (this.IRACertificateText !=''){
        this.IRACertificateText = CONST.showhideAccount.IRAMMCText;
      }else{
        this.IRACertificateText = CONST.showhideAccount.Certificates;
      }
    }     
  }

  //SaveSettings button
  //Update account show-hide values
  updateShowHideAccounts() {
    let arrAccountTotal = [];
    let arrCheckSaveAccountsToggle = [];
    let arrCreditCardAccountsToggle = [];
    let arrLoanAccountsToggle = [];
    let arrMortgageAccountsToggle = [];
    let arrExternalAccountsToggle = [];

    let arrAfterToggle = this.checkSaveAccountsToggleStatus.concat(this.creditCardAccountsToggleStatus, this.loanAccountsToggleStatus, this.mortgageAccountsToggleStatus, this.externalAccountsToggleStatus);

    //getting modified accounts info
    if (this.arraysEqual(this.initToggleStatus, arrAfterToggle) == true && this.getIRAToggleStatus(this.initIRAToggleStatus, this.IRAAccountsToggleStatus) == true && this.getIRAToggleStatus(this.initCertificateAccountsToggleStatus, this.certificateAccountsToggleStatus) == true) {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Display explaining no changes were made',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.getaccountMask(this.checkSaveAccountsToggleStatus, arrCheckSaveAccountsToggle, this.accountsList.checkSaveAccounts);
      this.getaccountMask(this.creditCardAccountsToggleStatus, arrCreditCardAccountsToggle, this.accountsList.creditCardAccounts);
      this.getaccountMask(this.loanAccountsToggleStatus, arrLoanAccountsToggle, this.accountsList.loanAccounts);
      this.getaccountMask(this.mortgageAccountsToggleStatus, arrMortgageAccountsToggle, this.accountsList.mortgageAccounts);
      this.getaccountMask(this.externalAccountsToggleStatus, arrExternalAccountsToggle, this.accountsList.externalAccounts);
      arrAccountTotal = arrCheckSaveAccountsToggle.concat(arrCreditCardAccountsToggle, arrLoanAccountsToggle, arrMortgageAccountsToggle, arrExternalAccountsToggle);
     
      this.showIRAAccount = this.IRAAccountsToggleStatus;
      this.showCertificate =  this.certificateAccountsToggleStatus;
      this.httpProvider.updateHideAccounts(arrAccountTotal, this.showIRAAccount, this.showCertificate);
      this.refreshData = true;
     }
  }

  //Compare whether user change the toggle button
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i in arr1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  //get account toggle status which is boolean;
  getToggleStatus(arr, toggleStatus) {
    if (arr != null && arr.length > 0) {
      for (let i of arr) {
        toggleStatus.push(i.showAccount);
        this.initToggleStatus.push(i.showAccount);
      }
    }
  }
  //check whether IRA show/account toggleStatus have changed
  getIRAToggleStatus(initToggle, currentToggleStatus) {
    return (initToggle == currentToggleStatus) ? true : false;
  }

  getaccountMask(arr, arrMask, obj) {
    for (let i in arr) {
      if (arr[i] == false) {
        arrMask.push(obj[i].accountMask)
      }
    }
  }

  //SaveSettings button
  updateShowHideStaus() {
    this.updateShowHideAccounts();
    setTimeout(() => {
      this.navCtrl.push(AccountsPage,{
        refreshData:this.refreshData
      });
    }, 1000)
  }
  //close icon in nav bar
  close() {
    this.navCtrl.push(SettingsPage);
  }

}
