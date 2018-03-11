import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HelploginPage } from '../../pages/helplogin/helplogin';
import { LoginPage } from '../../pages/login/login';
import { AccountLockedPage } from '../../pages/account-locked/account-locked';
import { ApiService } from '../../providers/api-service';
import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AppSettings } from '../core/app-settings';
import { SecurityQuestionProvider } from '../../providers/security-question/security-question'
/**
 * Generated class for the SecurityquestionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface securePageData {
  _body?: string
}

@IonicPage()
@Component({
  selector: 'page-securityquestion',
  templateUrl: 'securityquestion.html',
})
export class SecurityquestionPage {

  public deviceToken: any;

  public counterValue: number;
  public securityQuestionForm: FormGroup;
  public counter: number = 0;
  public userName: any;
  public appSettings = AppSettings.singletonInstance();
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public api: ApiService, public localStorage: Storage, public questionProvider: SecurityQuestionProvider) {

    this.securityQuestionForm = new FormGroup({
      secureAnswer: new FormControl('', Validators.compose([Validators.required])),
      saveDevice: new FormControl(false, [])
    });
    // this.localStorage.get('savedUser').then((data) => {
    //   this.userName = data;
    //   console.log("username from securitypage"+this.userName);
    // });

  }

  ionViewDidLoad() {
    this.userName=this.api.userName;
    console.log('ionViewDidLoad SecurityquestionPage');
  }



  submitSecurityQuestion(securityQuestionForm) {
    let appSettings = AppSettings.singletonInstance();

    this.counter += 1;
    console.log("counter value::" + this.counter);
    if (this.counter <= 3) {
      this.api.submitSecurityQuestion(securityQuestionForm.value.secureAnswer, securityQuestionForm.value.saveDevice, appSettings).subscribe(
        (response: any) => {
          let res = JSON.parse(response._body);
          //let res = response.json();
          console.log(res);
          console.log("Inside submitSecurityQuestion res");
          console.log("responseCorrect value-->"+res.responseCorrect);

          if (res.accountLocked === true) {
            this.navCtrl.push(AccountLockedPage);
          }
          if (res.responseCorrect === true) {
            this.api.hash=res.securityHash;
            this.navCtrl.push(LoginPage, {
              showLoginForm: true,
              userName: this.userName
            });
          } else if(res.responseCorrect === false){
          //else{
            //this.alertForWrongAnswer();

            this.api.securityQuestion = res.securityQuestion;
            this.api.securityQuestionId = res.securityQuestionId;
            this.api.transactionId = res.transactionId;
            this.api.sessionId = res.sessionId;
            this.api.deviceToken = res.deviceToken;
            this.api.securityHash = res.securityHash;
            this.api.submitSecurityQuestion(securityQuestionForm.value.secureAnswer, securityQuestionForm.value.saveDevice, appSettings).subscribe(
              (response: any) => {
                let resp = JSON.parse(response._body);
                console.log(resp);
                if (resp.responseCorrect === true) {
                  this.navCtrl.push(LoginPage, {
                    showLoginForm: true
                  });
                } else if (resp.responseCorrect === false){
                  this.api.securityQuestion = resp.securityQuestion;
                  this.api.securityQuestionId = resp.securityQuestionId;
                  this.api.transactionId = resp.transactionId;
                  this.api.sessionId = resp.sessionId;
                  this.api.deviceToken = resp.deviceToken;
                  this.api.securityHash = resp.securityHash;
                  this.api.submitSecurityQuestion(securityQuestionForm.value.secureAnswer, securityQuestionForm.value.saveDevice, appSettings).subscribe(
                    (response: any) => {
                      let res = JSON.parse(response._body);
                      console.log(res);
                      if (res.responseCorrect === true) {
                        this.navCtrl.push(LoginPage, {
                          showLoginForm: true
                        });
                      } else if(res.accountLocked === true) {
                        this.navCtrl.push(AccountLockedPage);
                      }

                    });
                }
              });
          }


        }, (err) => {
          console.log(err);
        }, () => {
          console.log("Finally Block...!");
        })
    } else {
      console.log("It should go to Account Locked Page");
      this.navCtrl.push(AccountLockedPage);
    }
  }


  saveDeviceInformation() {
    this.localStorage.ready().then(() => {
      this.localStorage.get('deviceToken').then((data) => {
        if (data != null) {
          this.saveDeviceInformationService(data);
        }
      });
    });
  }

  saveDeviceInformationService(deviceToken) {
    let appSettings = AppSettings.singletonInstance();
    this.api.saveDevice(deviceToken, appSettings).subscribe(
      (res: any) => {
        console.log(res);

      }, (err) => {
        console.log("Error Block...!");
      }, () => {
        console.log("Finally Block...!");
      })
  }

  alertForWrongAnswer() {
    let alert = this.alertCtrl.create({
      title: "We're sorry.",
      subTitle: 'Your Security Question and Answer did not match. Please try again. For your protection, you will be locked out after three unsuccessful attempts.',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.navCtrl.push(SecurityquestionPage);
          }
        }
      ]
    });
    alert.present();
  }

  differentUserLogin() {
    this.navCtrl.push(LoginPage);
  }
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }
  cancelView() {
    this.navCtrl.push(LoginPage);
  }
}
