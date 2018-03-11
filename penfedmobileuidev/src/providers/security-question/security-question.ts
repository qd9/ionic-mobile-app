import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';
/*
  Generated class for the SecurityQuestionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SecurityQuestionProvider {
private appSettings: any;

  constructor(public http: Http) {
    this.appSettings = AppSettings.singletonInstance();
    console.log('Hello SecurityQuestionProvider Provider');
  }

  
}
