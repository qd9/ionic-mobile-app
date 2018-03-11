import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UpdatePasswordProvider } from '../../providers/update-password/update-password';
import { CustomValidators } from '../../directives/white-space/white-space';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CreateNewpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-newpassword',
  templateUrl: 'create-newpassword.html',
})
export class CreateNewpasswordPage {
  changePasswordForm: FormGroup;
  public display: boolean;
  public buttonValidate: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,public UPP:UpdatePasswordProvider,public localStorage: Storage) {
    this.changePasswordForm = fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), CustomValidators.validateWhiteSpace, Validators.pattern(/^(?=.*\d){1,16}/)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  popView() {
    this.navCtrl.pop();
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
}
