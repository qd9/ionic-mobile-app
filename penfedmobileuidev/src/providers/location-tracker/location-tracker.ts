import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public ApiEndpoint:string;

  constructor(public http: Http,public api: ApiEndpointProvider) {
    console.log('Hello LocationTrackerProvider Provider');
    this.ApiEndpoint = this.api.getEndpoint();
  }

  getLocationDataInfo(username,latitude,longitude) {
    console.log(username+" "+latitude+" "+longitude);
    var data = 'username=username&latitude=latitude&longitude=longitude';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(this.ApiEndpoint+"/rest/public/login/greetingInfo/",data,options);
  }

}
