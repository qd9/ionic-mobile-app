import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
//import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';
import { Platform, AlertController } from 'ionic-angular';
/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpdatePasswordProvider {
  public ApiEndpoint: any;
  private appSettings: any;
  //private httpProvider: Http;

  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider, public platform: Platform, public alertCtrl: AlertController) {

    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
    this.appSettings = AppSettings.singletonInstance();
    //this.appSettings.getServiceUrls(this.httpProvider,this.platform);
  }

  updatePassword(username,currentPwd,newPwd){
    let data = "username="+username+"&currentPassword="+currentPwd+"&newPassword="+newPwd;
    console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.ApiEndpoint + "/rest/private/settings/changePassword", data, options)
  }



}
