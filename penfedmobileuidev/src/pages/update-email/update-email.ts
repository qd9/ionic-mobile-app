import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ContactInfoPage } from '../contact-info/contact-info';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SecurityPage } from '../security/security';
import { AlertController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-update-email',
  templateUrl: 'update-email.html',
  providers: [ContactInformationProvider]
})
export class UpdateEmailPage {
  public primaryEmail: any;
  public secondaryEmail: string = "";

  public initPrimaryEmail: any;
  public initSecondaryEmail: string = " ";

  public userName: any;
  public display: boolean;
  public loading: any;

  emailValidateForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public updateEmailService: ContactInformationProvider, fb: FormBuilder, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.emailValidateForm = fb.group({
      primaryemail: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      secondaryemail: ['', [Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    })
  }

  goContactInfoPage() {
    console.log(this.secondaryEmail);
    if(this.secondaryEmail == null){
      this.secondaryEmail="";
    }
    if (this.initPrimaryEmail == this.primaryEmail.toUpperCase() && this.initSecondaryEmail == this.secondaryEmail) {
      let alert = this.alertCtrl.create({
        title: 'No Change',
        subTitle: "Your did not do any change on your Email address.",
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push(SecurityPage, {
        priEmail: this.primaryEmail,
        secEmail: this.secondaryEmail,
        page: 'UpdateEmailAddressPage'
      });
    }
  }

  popView() {
    this.navCtrl.pop();
  }
  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading Email...',
      spinner: 'crescent'
    });
    this.loading.present();

    this.updateEmailService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        this.primaryEmail = result.primaryEmail;
        this.secondaryEmail = result.secondaryEmail;
        this.userName = result.userDisplayName;
        this.initPrimaryEmail = this.primaryEmail;
        this.initSecondaryEmail = this.secondaryEmail;
        if(this.initSecondaryEmail == null){
          this.initSecondaryEmail = "";
        }
      }, error => {
        console.log(error);
      }, () => {
        this.loading.dismiss();
      });
  }
  onBlurMethod() {
    if (this.emailValidateForm.controls.secondaryemail.value != "") {
      this.display = true;
    }
  }

}
