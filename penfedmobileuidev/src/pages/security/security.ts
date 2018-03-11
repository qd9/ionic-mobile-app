import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { UpdateContactInfoProvider } from '../../providers/update-contact-info/update-contact-info';
import { HelploginPage } from '../helplogin/helplogin';
import { SecurityLockedPage } from '../security-locked/security-locked';
//import { UpdateEmailPage } from '../update-email/update-email';
import { ContactInfoPage } from '../contact-info/contact-info';
//import { UpdatePhoneNumPage } from '../update-phone-num/update-phone-num';
/**
 * Generated class for the SecurityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage {
  public securityNumber: any;
  public securityObj: any;
  public resCorrect: any;
  public token: any;
  public priEmail: any;
  public secEmail: any;
  public dayNum: any;
  public eveningNum: any;
  public cellNum: any;
  public mailingData:any;
  public page: any;
  public attemptTimes:number;

  user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private alertCtrl: AlertController, public UCIP: UpdateContactInfoProvider,private viewCtrl: ViewController) {
    this.user = fb.group({
      securityNumber: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(6)]]
    })
    //get page
    this.page = "" || this.navParams.get('page');

    //email data
    this.priEmail = this.navParams.get('priEmail');
    this.secEmail = this.navParams.get('secEmail');

    //contact number data
    this.dayNum = this.navParams.get('daynumber');
    this.eveningNum = this.navParams.get('eveningnumber');
    this.cellNum = this.navParams.get('cellnumber');

   // mailing address data
    this.mailingData = this.navParams.get('payload');
  }
  popView() {
    this.navCtrl.pop();
  }
  popUpMethod() {
    let alert = this.alertCtrl.create({
      title: 'Security Code',
      subTitle: 'The PenFed Security Code, a 4 to 6 digit number, is a new feature that lets you securely update account information. To protect your identity, this code is unique and will verify that you are who you say you are. This value is initially the same as your PIN and can be changed on PenFed.org.',
      buttons: ['OK']
    });
    alert.present();
  }
  goToHelpLogin(){
    this.navCtrl.push(HelploginPage);
    //this.navCtrl.push(SecurityLockedPage);
  }
  onSubmit() {
    this.UCIP.getSecurityCode(this.securityNumber).subscribe(data => {
      let day, evening, cell;
    //console.log('Security Check Data before', data);
      this.securityObj = data.json();
      this.resCorrect = this.securityObj.responseCorrect;
      this.attemptTimes = this.securityObj.attemptsRemaining;
      this.token = this.securityObj.successToken;
      let times = this.attemptTimes;

      //console.log('Security Check Data after', data);
      if (this.resCorrect == true) {
        if (this.page == 'UpdateEmailAddressPage') {
          this.UCIP.updateEmailAddress(this.priEmail, this.secEmail, this.token).subscribe(data => {
            this.navCtrl.push(ContactInfoPage)
            .then(() => {
              //first we find the index of the current view controller:
                let index = this.viewCtrl.index;
                //then we remove it from the navigation stack
                for(let i=index;i>0;i--){
                 this.navCtrl.remove(i);
               }
             });
          }, error => {
            console.log(error);
          });
        } else if (this.page == 'UpdateContactNumberPage') {
          day = this.doUpdateContactNumber(this.dayNum);
          evening = this.doUpdateContactNumber(this.eveningNum);
          cell = this.doUpdateContactNumber(this.cellNum);

          this.UCIP.updatePhoneNumber(day, evening, cell, this.token).subscribe(data => {
            this.navCtrl.push(ContactInfoPage)
            .then(() => {
              //first we find the index of the current view controller:
                let index = this.viewCtrl.index;
                //then we remove it from the navigation stack
                for(let i=index;i>0;i--){
                 this.navCtrl.remove(i);
               }
             });
          }, error => {
            console.log(error);
          });
        } else if(this.page == 'UpdateMailingAddressPage'){
          this.mailingData.token = this.token;
            this.UCIP.updateMailingAddress(this.mailingData).subscribe(data => {
              console.log(data);
              this.navCtrl.push(ContactInfoPage)
              .then(() => {
                //first we find the index of the current view controller:
                  let index = this.viewCtrl.index;
                  //then we remove it from the navigation stack
                  for(let i=index;i>0;i--){
                   this.navCtrl.remove(i);
                 }
               });
            }, error => {
              console.log(error);
            });
        }
      } else if(this.resCorrect == false && times > 0){
        let alert = this.alertCtrl.create({
          title: "We're sorry.",
          subTitle: 'The code entered was not correct. Please try again. There are ' + times + ' attempts remaining.',
          buttons: ['OK']
        });
        alert.present();
      } else if(this.resCorrect == false && times < 0){
        this.navCtrl.push(SecurityLockedPage);
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Security Code Error',
        subTitle: 'You are entered a invalid Security Code, if your are not sure with the code, please contact PenFed to modify.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

// release contact number
  releaseFormatNumber(val) {
    return val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/)[0];
  }
//format the data
  doUpdateContactNumber(val) {
    if (val == "") {
      return "";
    } else {
      return this.releaseFormatNumber(val);
    }
  }
}
