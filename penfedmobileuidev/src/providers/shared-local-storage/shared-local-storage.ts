import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from "rxjs/Rx";


/*
  Generated class for the SharedLocalStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SharedLocalStorageProvider {
  //Using replay subject to endure that the data is passed in a Observable to the subscribed value.
  public sharedLocalStorageData: ReplaySubject<any> = new ReplaySubject(1);
  constructor(public http: Http, public localStorage: Storage) {
  }

  setValue(key, value) {
    this.localStorage.ready().then(() => {
      this.localStorage.set(key, value);
    });
  }
  getValue(key) {
    let data: any;
    this.localStorage.ready().then(() => {
      this.localStorage.get(key).then(res => {
        if (res !== null) {
          data = res;
        } else {
          data = false;
          this.localStorage.set(key, data);
        }
        this.sharedLocalStorageData.next(data);
      });
      return this.sharedLocalStorageData;
    });
  }

}
