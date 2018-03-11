import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { UpdatePhoneNumPage } from '../update-phone-num/update-phone-num';
//import { StatusBar } from '@ionic-native/status-bar';
import { SettingsPage } from '../settings/settings';
import { UpdateMailingAddressPage } from '../update-mailing-address/update-mailing-address';
import { UpdateEmailPage } from '../update-email/update-email';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ContactInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({

  selector: 'page-contact-info',
  templateUrl: 'contact-info.html',
  providers: [ContactInformationProvider]
})
export class ContactInfoPage {

  public dayTimeNum: any = "";
  public eveningNum: any = "";
  public cellNum: any = "";
  public dayTimePhoneNumber: any = "";
  public eveningNumber: any = "";
  public cellNumber: any = "";
  public primaryEmailAddress: any;
  public secondaryEmail: any;
  public userName: string;
  public showDayTimePhoneNumber: boolean;
  public showEveningNumber: boolean;
  public showCellNumber: boolean;
  public showEmail: boolean;
  private streetAddress1: string;
  private streetAddress2: string;
  private cityAddress: string;
  private stateAddress: string;
  private zip: number;
  private physicalstreetAddress1: string;
  private physicalstreetAddress2: string;
  private physicalcityAddress: string;
  private physicalstateAddress: string;
  private physicalzip: number;
  public phoneNumber: any;
  public loading: any;
  private mailingAddress:any;
  public isTherePhysicalAddress: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, 
    public phoneNumberService: ContactInformationProvider,public loadingCtrl: LoadingController) {
  }

  //back to previous page;
  popView() {
    this.navCtrl.push(SettingsPage);
  }
  //go to edit phone number
  goToEditPhoneNumPage() {
    this.navCtrl.push(UpdatePhoneNumPage);
  }
  goToUpdateMailingAddress() {
    console.log('trigger');
    // this.navCtrl.push(UpdateMailingAddressPage);
    this.navCtrl.push(UpdateMailingAddressPage,{
      mailingAdr: this.mailingAddress
    });
  }
  goToEditEmailPage() {
    this.navCtrl.push(UpdateEmailPage);
  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Contact Information...',
      spinner: 'crescent'
    });
    this.loading.present();

    this.phoneNumberService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        console.log(result);
        this.mailingAddress = result;
        this.dayTimePhoneNumber = result.dayTimePhone;
        this.eveningNumber = result.eveningPhone;
        this.cellNumber = result.cellPhone;
        if (this.dayTimePhoneNumber != null) {
          this.dayTimeNum = this.setFormatNumber(this.dayTimePhoneNumber);
        }
        if (this.eveningNumber != null) {
          this.eveningNum = this.setFormatNumber(this.eveningNumber);
        }
        if (this.cellNumber != null) {
          this.cellNum = this.setFormatNumber(this.cellNumber);
        }

        this.dayTimePhoneNumber ? this.showDayTimePhoneNumber = true : this.showDayTimePhoneNumber = false;
        this.eveningNumber ? this.showEveningNumber = true : this.showEveningNumber = false;
        this.cellNumber ? this.showCellNumber = true : this.showCellNumber = false;

        this.primaryEmailAddress = result.primaryEmail;
        this.secondaryEmail = result.secondaryEmail;
        this.streetAddress1 = result.mailingAddress1;
        this.streetAddress2 = result.mailingAddress2;
        this.cityAddress = result.mailingCity;
        this.stateAddress = result.mailingState;
        this.zip = result.mailingZip;

        // Show-up physical address
        if (result.physicalAddress1 != null) {
          this.physicalstreetAddress1 = result.physicalAddress1;
          this.physicalstreetAddress2 = result.physicalAddress2;
          this.physicalcityAddress = result.physicalCity;
          this.physicalstateAddress = result.physicalState;
          this.physicalzip = result.physicalZip;
          this.isTherePhysicalAddress = true;
        }
        
        if (this.secondaryEmail) {
          this.showEmail = true;
        }
        this.userName = result.userDisplayName;
      }, error => {
        console.log(error);
      }, () => {
        this.loading.dismiss();
      })
  }

  setFormatNumber(val) {
    var formatNumber;
    var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
    console.log(x[0])
    if (x[0].length == 10) {
      formatNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    } else {
      formatNumber = x[0];
    }
    return formatNumber;
  }

}
