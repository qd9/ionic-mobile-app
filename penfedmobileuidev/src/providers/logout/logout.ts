import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { Storage } from '@ionic/storage';
/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LogoutProvider {
  public ApiEndpoint:any;
  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider, public storage:Storage) {
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
  }

  sessionLogout(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    this.storage.get('isLoggedIn').then(res=>{
      if (res){
        this.storage.remove('isLoggedIn');
      }
    })
    return this.http.get(this.ApiEndpoint+"/ibm_security_logout", options);
  }
}
