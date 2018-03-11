import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers,Response} from '@angular/http';
import { Platform, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';
import { CONST } from '../../pages/core/const';

/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AccountsServiceProvider {
  public ApiEndpoint: any;
  private appSettings: any;
  //private httpProvider: Http;

  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider, public platform: Platform, public alertCtrl: AlertController) {
    console.log('Hello AccountsServiceProvider Provider');
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
    this.appSettings = AppSettings.singletonInstance();
    //this.appSettings.getServiceUrls(this.httpProvider,this.platform);
  }
  getRecentTransactions_old(AccountMaskVal) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts/transactions/" + AccountMaskVal, options)
      .map(res => { return res.json() }).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          cssClass: 'myPopup',
          subTitle: 'Recent Transactions data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({});
      });
  }

  /* get the IRA accounts services data */
  getIRACertificates_old() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    // let url= this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.IRAAccountsUrl;
    // console.log("account service page:::"+url);
    //    return this.http.get(url,options)
    //    .map(res=>{return res.json()});
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts/certificates", options).map(res => res.json())
      .map((data) => {
        let res: any = {};
        res.iraCertificateData = data;
        return res;
      })
  }

  //Update show hide IRA accounts
  updateHideAccounts(accountMasksToHide: any, showIRA: boolean, showMoneyMarket: boolean) {
    let body = JSON.stringify({ accountMasksToHide, showMoneyMarket, showIRA });
    console.log(body);
    let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.updateShowHideAccountsUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }
   //Update nickname server
  updateNickName(acctMask:any, nickname:any) {
    let body = JSON.stringify([{acctMask, nickname}]);
    console.log(body);
    //let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.contact.updateAccountNickNameUrl;
    let url = this.appSettings.serviceUrls.baseUrl+"private/settings/accountnicknames";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options);
  }

  getCreditCardRewards_old(AccountMaskVal) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts/rewards/" + AccountMaskVal, options);
  }

  getCombinedAccounts_old(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return Observable.forkJoin([
      this.http.get(this.ApiEndpoint + "/rest/private/accounts", options).map(res => res.json()).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          cssClass: 'myPopup',
          subTitle: 'Account data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({
          checkSaveAccounts:[],
          loanAccounts:[],
          creditCardAccounts:[],
          mortgageAccounts:[]
        });
      }),
      this.http.get(this.ApiEndpoint + "/rest/private/accounts/certificates", options).map(res => res.json()).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          cssClass: 'myPopup',
          subTitle: 'IRA or certificate data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({
          iraAccounts:[],
          certificateAccounts:[]
        });
      })
    ]).map((data) => {
      let res: any = {};
      res.accountData = data[0];
      res.iraCertificateData = data[1];
      return res;
    }).catch(res => {
      let alert = this.alertCtrl.create({
        title: 'Sorry.',
        cssClass: 'myPopup',
        subTitle: 'Data Cannot be loaded at this time.',
        buttons: ['Ok']
      });
      alert.present();
      return Observable.of({});
    })
  }

getCombinedAccounts(): Observable<any> {
  let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.accountslsUrl;
  let IRAAccountServiceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.IRAAccountsUrl;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return Observable.forkJoin([
      this.http.get(serviceUrl, options).map(res => res.json()).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          subTitle: 'Account data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({
          checkSaveAccounts:[],
          loanAccounts:[],
          creditCardAccounts:[],
          mortgageAccounts:[]
        });
      }),
      //private/accounts/certificates this.ApiEndpoint + "/rest/private/accounts/certificates"
      this.http.get(IRAAccountServiceUrl, options).map(res => res.json()).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          subTitle: 'IRA or certificate data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({
          iraAccounts:[],
          certificateAccounts:[]
        });
      })
    ]).map((data) => {
      let res: any = {};
      res.accountData = data[0];
      res.iraCertificateData = data[1];
      return res;
    }).catch(res => {
      let alert = this.alertCtrl.create({
        title: 'Sorry.',
        subTitle: 'Data Cannot be loaded at this time.',
        buttons: ['Ok']
      });
      alert.present();
      return Observable.of({});
    })
  }

  getIRACertificates() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.IRAAccountsUrl;
    return this.http.get(url,options)
       .map(this.parseData)
       .catch(this.handleError);
  }

    /*  get the Accounts services data */
  getAccountsData() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.accountslsUrl;
    return this.http.get(url,options)
       .map(this.parseData)
       .catch(this.handleError);
  }

  private parseData(res: Response) {
    let body = res.json();
    console.log('response', body);
    return body|| { };
  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }

  //Update show hide IRA accounts
  getCreditCardRewards(AccountMaskVal) {
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.creditcardRewardUrl + "/";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options);
  }

  getRecentTransactions(AccountMaskVal) {
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.recentTransactions + "/";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options)
      .map(res => { return res.json() }).catch(res => {
        let alert = this.alertCtrl.create({
          title: 'Sorry.',
          subTitle: 'Recent Transactions data cannot be loaded at this time.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({});
      });
  }

  getCreditCardTransactions(){
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.creditCard.creditCardTransactionsUrl;
    var data = 'accountMask=13b31635-f282-464a-a3ab-84ee5ba3dd83&statementPeriod=Recent';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
  }

  getLoanTransactions(AccountMaskVal){
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.loanAccountTransactions;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options);
  }
  getCheckImage(accountMasksVal: number, amountInCents: number, checkNumber: number, postDate:any) {
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.accounts.getCheckImage;
    let body:string = "accountMask="+accountMasksVal+"&amountInCents="+amountInCents+"&checkNumber="+checkNumber+"&postDate="+postDate;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(serviceUrl, body, options)
      .map(res => { return res.json() })
      .catch(res => {
        let alert = this.alertCtrl.create({
          title: "We're sorry.",
          subTitle: 'There was an error retrieving your check images.  Please try again later.',
          buttons: ['Ok']
        });
        alert.present();
        return Observable.of({});
      });
  }
}
