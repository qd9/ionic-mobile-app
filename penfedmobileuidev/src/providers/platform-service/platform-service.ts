import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlatformServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlatformServiceProvider {
  private rsaDeviceInfo: any;

  constructor(private plt: Platform) {
    console.log('Hello PlatformServiceProvider Provider');
  }

  public isSDKorJS(){
    return (this.plt.is('ios') || this.plt.is('android')) ? 'SDK' : 'JS';
  }

  public setRsaDeviceInfo(data: any){
    this.rsaDeviceInfo = data;
  }
  
  public getRsaDeviceInfo() {
    return this.rsaDeviceInfo;
  }
}
