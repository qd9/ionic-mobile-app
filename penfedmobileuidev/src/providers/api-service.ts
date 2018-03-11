import { Injectable  } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import {  HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "./api-endpoint/api-endpoint";
//import { Observable } from "rxjs/Observable";
//import { AppSettings } from '../../pages/core/app-settings';
import { CONST } from '../../pages/core/const';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ApiService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts: any;
  public reditCardAccounts: any;
  public loanAccounts: any;
  public mortgageAccounts: any;
  public user: string;
  public pass: string;
  public hash: string;
  public ApiEndpoint: string;
  private appSettings: any;
  private _rsaDeviceInfo: any;
  private _rsaSDKOrJS: string = 'JS';

  public securityQuestion:any;
  public securityQuestionId:any;
  public sessionId:any;
  public transactionId:any;
  public securityAnswer: any;
  public deviceToken: any;
  public securityHash:any = null;
  public loginErrorMessage: any;
  public userName:any;


  constructor(platform: Platform, public http: Http, public api: ApiEndpointProvider) {
    console.log('Hello ApiService Provider');
    this.ApiEndpoint = this.api.getEndpoint();
    // debugger;
    if (platform.is('android') || platform.is('ios')){
      this._rsaSDKOrJS='SDK';
    }else{
      this._rsaSDKOrJS='JS';
    }
  }

  /*
  constructor(public http: Http, public api: ApiEndpointProvider) {
    console.log('Hello ApiService Provider');
    this.ApiEndpoint = this.api.getEndpoint();
  }*/

  public rsaDeviceInfo(data: any) {
    this._rsaDeviceInfo = data;
  }

  public rsaSDKOrJS(data: string) {
    this._rsaSDKOrJS = data;
  }


  setHash(hashVal: string) {
    this.hash = hashVal;
  }

  beforeLogin(loginFormUsername, appSettings) {
    this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl +
      this.appSettings.serviceUrls.login.beforeLoginUrl + this._rsaSDKOrJS;
      console.log('beforelogin serviceurl - '+serviceUrl);
    var data = "d=" + this.getRSADeviceInfo() + "&u=" + loginFormUsername + "&clientVersion=2.7&buildNumber=6183";
    //var data = "j_username=174158&j_password=yyyy&hash=yyy&clientVersion=2.7&buildNumber=6183"
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': false });
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //  return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }

  // firstRequest() {
  //   let serviceUrl = this.appSettings.serviceUrls.login.loginUrl;
  //   var data = "j_username=174158&j_password=yyyy&hash=yyy&clientVersion=2.7&buildNumber=6183";
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let options = new RequestOptions({ headers: headers, withCredentials: true });
  //   return this.http.post(serviceUrl, data, options);
  //   // return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  // }

  rsaRequest(user, pass, appSettings) {
    this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl +
      this.appSettings.serviceUrls.login.beforeLoginUrl + this._rsaSDKOrJS;
    this.user = user;
    var data = "j_username=" + user + "&j_password=" + pass + "&hash=" + this.hash + "&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //   return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }

  login(user, pass, appSettings) {
    this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.login.loginUrl;
    this.user = user;
    var data = "j_username=" + user + "&j_password=" + pass + "&hash=" + encodeURIComponent(this.hash) + "&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //  return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  }

  submitSecurityQuestion(secureAnswer, saveDevice,appSettings) {
    this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.saveSecurityAnsUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let data = "ddata="+this.getRSADeviceInfo()+"&token="+this.deviceToken+"&save="+saveDevice+"&username="
                +this.userName+"&qid="+this.securityQuestionId+"&r="+secureAnswer+"&sid="+encodeURIComponent(this.sessionId)
                +"&tid="+encodeURIComponent(this.transactionId);
    return this.http.post(serviceUrl,data, options);
    //  return this.http.get(this.ApiEndpoint+"/rest/public/login/JS/confq/"+secureAnswer, options);
  }

  // getDeviceInformation(appSettings) {
  //   this.appSettings = appSettings;
  //   let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.getDeviceInfoUrl;
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let options = new RequestOptions({ headers: headers, withCredentials: true });
  //   return this.http.get(serviceUrl + options);
  //   // return this.http.get(this.ApiEndpoint+"/rest/private/settings/"+ options);
  // }

  saveDevice(deviceInfo, appSettings) {
    this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.saveDeviceInfoUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + deviceInfo, options);
    // return this.http.get(this.ApiEndpoint+"/rest/private/settings/JS/"+deviceInfo, options);
  }

  // securityAnswerValidate(secureAnswer, appSettings) {
  //   this.appSettings = appSettings;
  //   let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.securityAnsValidateUrl;
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let options = new RequestOptions({ headers: headers, withCredentials: true });
  //   var data = "ddata="+this.getRSADeviceInfo()+"&token="+this.deviceToken+"&save=false&username="
  //               +this.userName+"&qid="+this.securityQuestionId+"&r="+this.userName+"&sid="+this.sessionId
  //               +"&tid="+this.transactionId;
  //   return this.http.get(serviceUrl + options);
  //   //  return this.http.get(this.ApiEndpoint+"/rest/public/security/JS/"+options);
  // }

  private getRSADeviceInfo() {
    return this._rsaDeviceInfo != undefined ? this._rsaDeviceInfo : "version%3D3%2E0%2E0%2E0%5F5%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28iphone%3B%20cpu%20iphone%20os%209%5F1%20like%20mac%20os%20x%29%20applewebkit%2F601%2E1%2E46%20%28khtml%2C%20like%20gecko%29%20version%2F9%2E0%20mobile%2F13b143%20safari%2F601%2E1%7C5%2E0%20%28iPhone%3B%20CPU%20iPhone%20OS%209%5F1%20like%20Mac%20OS%20X%29%20AppleWebKit%2F601%2E1%2E46%20%28KHTML%2C%20like%20Gecko%29%20Version%2F9%2E0%20Mobile%2F13B143%20Safari%2F601%2E1%7CMacIntel%26pm%5Ffpsc%3D24%7C375%7C667%7C667%26pm%5Ffpsw%3D%26pm%5Ffptz%3D5%2E5%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3D%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D375%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3DNaN%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D";
  }

  secondRequest() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts", options);
  }
}
