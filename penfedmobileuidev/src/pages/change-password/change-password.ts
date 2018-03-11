import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../directives/white-space/white-space';
import { UpdatePasswordProvider } from '../../providers/update-password/update-password';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
//import { PasswordValidation } from '../../pipes/changePasswordValidation';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changePasswordForm: FormGroup;
  public shown: boolean;
  public display: boolean;
  public buttonValidate: boolean = true;
  public localuserNameForPWD: any;
  public confirmPassword:any;
  public currentPassword:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public localStorage: Storage,public UPP:UpdatePasswordProvider,private alertCtrl: AlertController) {
    this.changePasswordForm = fb.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      // newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), this.validateWhiteSpace, Validators.pattern(/^(?=.*\d){1,16}/)]],
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), CustomValidators.validateWhiteSpace, Validators.pattern(/^(?=.*\d){1,16}/)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.localStorage.get('userNameForPWD').then((userNameForPWD) => {
      if (userNameForPWD != null) {
        // this.localuserNameForPWD = userNameForPWD;
        this.localuserNameForPWD = "nmpptest1";
      }
      console.log(this.localuserNameForPWD);
    });
    console.log(this.localuserNameForPWD);
  }

  onBlurMethod() {
    let password = this.changePasswordForm.controls.newpassword.value; // to get value in input tag
    let confirmPassword = this.changePasswordForm.controls.repeatpassword.value; // to get value in input tag

    if (password != confirmPassword) {
      if (confirmPassword == "") {
        this.display = false;
      } else {
        console.log('false');
        this.buttonValidate = true;
        this.display = true;
      }
    } else {
      console.log('true');
      this.display = false;
      this.buttonValidate = false;
    }
  }

  popView() {
    this.navCtrl.pop();
  }

  onSubmit(){
    this.UPP.updatePassword(this.localuserNameForPWD, this.currentPassword, this.confirmPassword).subscribe(data => {
      console.log(data.json());
      let res = data.json();
      if(res.success == true){
        let alert = this.alertCtrl.create({
          title: 'Change success!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(SettingsPage);
      }else{
        let alert = this.alertCtrl.create({
          title: 'Security Code',
          subTitle: 'There was an unkown error while processing your request.Please try again and contact PenFed if the problem persists',
          buttons: ['OK']
        });
        alert.present();
      }
    }, error => {
      console.log(error);
    });
  }
  // custom validation for no space
  // validateWhiteSpace(c: FormControl) {
  //   let whitespaceRegEx = /^\S+$/;
  //   if(c.value !=""){
  //     return whitespaceRegEx.test(c.value) ? null : {
  //       whiteSpace: {
  //         valid: false
  //       }
  //     }
  //   }
  // }

}
