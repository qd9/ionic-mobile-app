import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { Component, Renderer, NgZone, Self, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { ApiService } from '../../providers/api-service';
import { AccountsPage } from '../accounts/accounts';
import { LoadingController, Platform, AlertController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactPage } from '../../pages/contact/contact';
//import { ProductsPage } from '../../pages/products/products';
import { LocationsPage } from '../../pages/locations/locations';
import { HelploginPage } from '../../pages/helplogin/helplogin';
import { SecurityquestionPage } from '../../pages/securityquestion/securityquestion';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AccountLockedPage } from '../account-locked/account-locked';
import { AppSettings } from '../core/app-settings';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device'; // added native device module
import { NetworkInformationProvider} from '../../providers/network-information/network-information';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { DepositsAgreementPage } from '../../pages/deposits-agreement/deposits-agreement';
//import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
//import * as timezoneJS from 'timezonemoment';
import 'rxjs/add/operator/filter';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { TermsConditionsPopupComponent } from '../../components/terms-conditions-popup/terms-conditions-popup';

interface bootstrapResponse {
  _body?: string
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LocationTrackerProvider]
})

export class LoginPage {

  public resultJson: any;
  public body: any;
  private lastActivityTime: any;
  public greetString: String;
  public greetingexcla: String;
  public greetingcomma: String;
  public welcomeString = "WELCOME TO PENFED";
  public showLoginForm: boolean = false;
  public loginForm: FormGroup;
  public readonly: boolean = false;
  public type = "password";
  public checkStatus = false;
  public welcomeMemberFlag: boolean = false;
  public userName: String;
  public networkConnection: boolean;
  public connectionType: any;
  public saveUserName = false;
  public userTouchedFlag: boolean = false;
  private httpProvider: Http;
  public deviceToken: any;
  //public nameNotAvailable:boolean = false;
  public acceptence: boolean;
  //public termsPage: boolean;
  //public depositPage: boolean;
  //private contactInformation: any;
  private userFirstName: String;
  private UUID: String;
  // private isTCAccepted:boolean = false;
  public counter = 1;
  public coordinatesInfo: any;

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public backgroundImg: any;
  public firstNameTimesRun = 0;
  public firstNameInterval: any;
  public locationTimesRun = 0;
  public locationInterval: any;

  constructor(public platform: Platform, public api: ApiService, public navParams: NavParams,
    public loading: LoadingController, public formBuilder: FormBuilder, public navCtrl: NavController,
    private alertCtrl: AlertController, private view: ViewController, public localStorage: Storage,
    private network: Network, public http: Http, public contactInfo: ContactInformationProvider,
    public networkInfo: NetworkInformationProvider, private device: Device, private modalCtrl: ModalController,
    private geolocation: Geolocation, public locationTracker: LocationTrackerProvider, public zone: NgZone,
    public changeDetector: ChangeDetectorRef) {
    this.httpProvider = http;
    //timezoneJS.timezone.init();
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])),
      saveUserName: new FormControl(false, []),
      enableTouchId: new FormControl(false, [])
    });

    // this.termsPage = this.navParams.get('termsPage');
    // this.depositPage = this.navParams.get('depositPage');
    // if (this.termsPage == true || this.depositPage == true) {
    //   this.readonly = this.navParams.get('readonly');
    //   this.userName = this.navParams.get('userName');
    // }
    this.localStorage.get('backgroundImg').then((data) => {
      this.backgroundImg = data;
    });
  }

  ngOnInit() {
    this.networkCheck();
    this.localStorage.get('formattedFirstName').then((data) => {
      this.userFirstName = data;
    });
  }

  networkCheck() {
    this.platform.ready().then(() => {
      this.zone.run(() => {
        this.network.onDisconnect().subscribe((data) => {
          this.connectionType = "No Internet Connection";
          this.networkConnection = false;
          this.localStorage.set("networkConnection", false);
          console.log('Network disconnected :-(');
          //this.displayNetworkAlert(this.networkConnection);
        });

        this.network.onConnect().subscribe((data) => {
          this.networkConnection = true;
          this.localStorage.set("networkConnection", true);
          console.log('Network connected!');
        });
      });

    });
  }

  displayNetworkAlert(networkConnection) {
    if (!networkConnection) {
      let alert = this.alertCtrl.create({
        title: "We're sorry!",
        subTitle: "You are not connected to the internet. Please connect and try your request again.",
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      alert.present();
    }
  }
  //on page enter (ionViewDidLoad) check local storage and
  //  1. add username to input
  //  2. change togglestate to true
  //  3. show password field
  checkLocalStorage() {
    this.localStorage.ready().then(() => {
      this.localStorage.get('savedUser').then((data) => {
        if (data != null) {
          this.welcomeMemberFlag = true;
          this.userName = data;
          this.readonly = true;
          this.saveUserName = true;
        }
      });
      this.localStorage.get('formattedFirstName').then((firstUserName) => {
        if (firstUserName != null) {
          this.userFirstName = firstUserName;
        }
      });
    });
  }

  setLocalStorage() {
    this.localStorage.set("savedUser", this.loginForm.value.userName);
    this.localStorage.set("welcomeMemberFlag", true);
  }

  clearLocalStorage() {
    this.localStorage.remove("savedUser");
    this.localStorage.remove("formattedFirstName");
    this.localStorage.set("welcomeMemberFlag", false);
    this.localStorage.remove("backgroundImg");

    this.welcomeMemberFlag = false;
  }

  /* Logged In as a different user start */
  differentUserLogin() {
    this.localStorage.clear()
    this.navCtrl.push(LoginPage);
  }
  isReadOnly() {
    return this.readonly;
  }

  ionViewDidEnter() {

    this.localStorage.ready().then(() => {
      this.checkLocalStorage();
    });
    //load url config
    this.localStorage.get('backgroundImg').then((data) => {
      this.backgroundImg = data;
    });
    this.localStorage.get('formattedFirstName').then((data) => {
      this.userFirstName = data;
    });
    let appSettings = AppSettings.singletonInstance();
    appSettings.getServiceUrls(this.httpProvider, this.platform);
    this.getWishMessage();

    this.showLoginForm = false;
    if (this.navParams.get('showLoginForm')) {
      this.showLoginForm = this.navParams.get('showLoginForm');
    }
    // if (this.api.userName) {
    //   this.loginForm.value.userName = this.navParams.get('userName');
    // }
    if (this.navParams.get('userName')) {
      this.loginForm.value.userName = this.userName = this.navParams.get('userName');
      this.readonly = true;
    }

    console.log("Flag Value:::" + this.welcomeMemberFlag);
    if (this.welcomeMemberFlag == false) {
      this.greetingexcla = "!";
      this.greetingcomma = ",";
    }
  }

  /*Added this method because of the Alert popup */
  ionViewWillEnter() {
    this.view.showBackButton(false);
  }

  showPassword() {
    console.log("Entering into showPassword");
    this.checkStatus = !this.checkStatus;
    if (this.checkStatus) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  private getWishMessage(): void {

    let currentDate = new Date();
    this.lastActivityTime = currentDate.getHours();
    if (this.lastActivityTime >= 0 && this.lastActivityTime < 12) {
      this.greetString = 'GOOD MORNING';
    } else if (this.lastActivityTime >= 12 && this.lastActivityTime < 17) {
      this.greetString = 'GOOD AFTERNOON';
    } else {
      this.greetString = 'GOOD EVENING'
    }
  }

  beforeLogin(loginForm) {
    //this.networkCheck();
    let appSettings = AppSettings.singletonInstance();
    console.log("In before login::::" + this.networkConnection);
    console.log(loginForm);
    this.localStorage.get('networkConnection').then((networkConnection) => {
      this.networkConnection = networkConnection;
    });
    if (this.networkConnection == false) {
      this.connectionType = "No Internet Connection";
      this.displayNetworkAlert(this.networkConnection);
    } else {
      console.log("Inside beforelogin else block");
      loginForm.value.saveUserName ? this.setLocalStorage() : this.clearLocalStorage();

      this.api.beforeLogin(loginForm.value.userName, appSettings).subscribe(
        (res: any) => {
          console.log("sessionid res object--->" + res._body);
          let response = JSON.parse(res._body);
          console.log("sessionid response object--->" + response.sessionId);
          console.log(response.accountExists);
          if (response != null && response.accountExists == false) {
            this.alertForNotListedUser();
            this.clearLocalStorage();
            this.showLoginForm = false;
            this.UUID = response.deviceToken
          }
          //else if (response.deviceToken ==  null) {
          else if (response.displaySecurityQuestion) {
            console.log("response from beforelogin:::" + response.sessionId + '' + response.transactionId);

            this.localStorage.set('deviceToken', response.deviceToken);
            this.deviceToken = response.deviceToken;
            this.api.securityQuestion = response.securityQuestion;
            this.api.securityQuestionId = response.securityQuestionId;
            this.api.transactionId = response.transactionId;
            this.api.sessionId = response.sessionId;
            this.api.deviceToken = response.deviceToken;
            this.api.securityHash = response.securityHash;
            this.api.loginErrorMessage = response.loginErrorMessage;
            this.api.userName = loginForm.value.userName;

            this.navCtrl.push(SecurityquestionPage);
          }
          else if (response != null && response.accountExists && !response.accountLocked) {
            /* validate the user on first login  */
            if (this.UUID == null) { //&& !this.isTCAccepted
              //this.device.uuid;
              this.localStorage.get('TCFlag').then((TCFlag) => {
                if (!TCFlag) {
                  this.localStorage.set("firstTimeUser", this.loginForm.value.userName);
                  this.localStorage.set("firstTimeUser", this.loginForm.value.userName);
                  this.presentTermsModal();

                  this.locationInterval = setInterval(() => {
                    this.locationTimesRun += 1;
                    if (this.locationTimesRun === 2) {
                      clearInterval(this.locationInterval);
                    }
                    //setTimeout(() => {
                    this.startRetrieveGeoInfo();
                    this.changeDetector.markForCheck();
                  }, 100);
                }
              });
            }
            if (loginForm.value.userName.length >= 5 && loginForm.value.userName.length <= 16) {
              console.log("coming here....")
              this.showLoginForm = true;
              this.readonly = true;
              this.userTouchedFlag = true;
              this.getUserFirstName();

            }
            this.api.setHash(response.securityHash);
          }
        }, (err) => {
          let alert = this.alertCtrl.create({
            title: "We're sorry.",
            subTitle: 'There was a connection timeout. Please check your connection and try again.',
            buttons: [
              {
                text: 'OK',
                role: 'OK',
                handler: () => {
                  //this.navCtrl.push(LoginPage);
                  this.loginForm.controls['userName'].setValue("");
                }
              }
            ]
          });
          alert.present();
        }, () => {
          console.log("Finally Block...!");
        }
      )
    }
  }

  /* login with username and password for accessing accounts information. */
  login(loginForm) {
    let appSettings = AppSettings.singletonInstance();
    console.log(loginForm);
    if (loginForm.valid) {
      this.showLoginForm = true;
      this.readonly = true;
      let loader = this.loading.create({
        content: 'Logging in...',
      });

      this.api.login(loginForm.value.userName, loginForm.value.password, appSettings).subscribe(
        (res: any) => {
          console.log(res);
          let resp = JSON.parse(res._body);

          // this.navCtrl.push(AccountsPage);
          loader.dismiss();
          if (!resp.success && resp.attemptsRemaining > 0) {
            this.alertForPasswordValidataion();
          }
          else if (!resp.success && resp.attemptsRemaining <= 0) {
            this.navCtrl.push(AccountLockedPage);
          }else if(resp.success){
            this.localStorage.set('isLoggedIn', true);
            this.navCtrl.push(AccountsPage);
          }


        },
        err => {
          //Check error msg and if response have invalid then increase counter
          // if(this.counter < 3) {
          //   this.alertForPasswordValidataion();
          // }
          // else {
          //     this.navCtrl.push(AccountLockedPage);
          // }
          loader.dismiss();
          // alert("There was an error");
        },
        () => {
          console.log("completed first req.. starting second");
          this.localStorage.set("userNameForPWD", this.loginForm.value.userName);
        });
      // }
      loginForm.value.saveUserName ? this.setLocalStorage() : this.clearLocalStorage()
    }
  }

  /* Start - NMPP 166 -  As a user. I would value a background image relevant to my location to illustrate that PenFed is a local organization.*/
  startRetrieveGeoInfo() {

    let options = {
      timeout: 6000,
      enableHighAccuracy: true
    };

    // this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe(
    //   (position: Geoposition) => {
    this.geolocation.getCurrentPosition(options).then((position) => {
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
      console.log('Geolocation:  ' + this.lat + ',' + this.lng);
      this.localStorage.get('savedUser').then((data) => {
        if (data != null) {
          this.locationTracker.getLocationDataInfo(data, this.lat, this.lng).subscribe(res => {
            let result = res.json();
            console.log("Location Info...!");
            console.log(result);
            console.log(result.backgroundClass);
            this.backgroundImg = result.backgroundClass;
            this.localStorage.set("backgroundImg", this.backgroundImg);
          });
        }
      });
    });
    this.changeDetector.markForCheck();
  }


  getUserFirstName() {
    this.firstNameInterval = setInterval(() => {
      this.firstNameTimesRun += 1;
      if (this.firstNameTimesRun === 7) {
        clearInterval(this.firstNameInterval);
      }
      this.showUserFirstName();
      this.changeDetector.markForCheck();
    }, 3000);
  }
  showUserFirstName() {
    this.localStorage.get('savedUser').then((data) => {
      if (data != null) {
        this.getUserInfoFromService();
      }
    });
  }
  getUserInfoFromService() {
    this.contactInfo.getContactInfo().subscribe(res => {
      let result = res.json();
      console.log(result);
      if (result.userDisplayName != null) {
        this.zone.run(() => {
          this.contactInfo.userName = result.userDisplayName.split(' ').slice(0, -1).join(' ')
          this.localStorage.set("formattedFirstName", this.contactInfo.userName);
        });
        //this.nameNotAvailable = false;
      } else {
        console.error("Not able to retrieve contact information from backend..!");
        //this.nameNotAvailable = true;
      }
    });
    this.changeDetector.markForCheck();
  }
  stopRetrieveGeoInfo() {
    this.watch.unsubscribe();
  }

  /* End - NMPP 166 -  As a user. I would value a background image relevant to my location to illustrate that PenFed is a local organization.*/

  /* Navigating to Contact Page */
  contactPenFed() {
    this.navCtrl.push(ContactPage, {
      fromLogin: true
    });
  }
  /* Navigating to Products Page */
  productInformation() {
    this.navCtrl.push(AccountLockedPage);
  }
  /* Navigating to Locations Page */
  locationsInformation() {
    this.navCtrl.push(LocationsPage);
  }
  /* Navigating to NeedHelpLoggingIn Page */
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }

  gotoTermsAndConditions() {
    console.log("Inside methdo");
    this.navCtrl.push(TermsConditionsPage);
  }
  /* It will show the alert popup if the user enter wrong username/memberId - No Limit */
  alertForNotListedUser() {
    let alert = this.alertCtrl.create({
      title: "We're sorry.",
      subTitle: 'This is not a PenFed username. Please re-enter.',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            //this.navCtrl.push(LoginPage);
            this.loginForm.controls['userName'].setValue("");
          }
        }
      ]
    });
    alert.present();
  }
  /** Alert for password validation NMPP-171 starts */
  alertForPasswordValidataion() {
    let msg = "<div>The username and password you have entered do not match.</div><div>Please try again.</div>";
    let alert = this.alertCtrl.create({
      title: "We're sorry.",
      cssClass: 'passwordAlertBox',
      message: msg,

      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.loginForm.controls['password'].setValue("");
            console.log('triggerd!');
          }
        }
      ]
    });
    alert.present();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
    this.counter = this.counter + 1;
  }
  /** Alert for password validation NMPP-171 ends */
  formatUserName(formatString) {
    console.log("Inside formatUserName " + formatString);
    this.userFirstName = formatString.split(' ').slice(0, -1).join(' ');
    return this.userFirstName;
  }


  /* terms and condition popup window method*/
  presentTermsModal() {
    let profileModal = this.modalCtrl.create(TermsConditionsPopupComponent, {}, { showBackdrop: true, enableBackdropDismiss: true });
    profileModal.onDidDismiss(data => {
      console.log("++++" + data);
      if (data == null) {
        this.showLoginForm = false;
      } else {
        this.showLoginForm = data.acceptence;
      }
    });
    profileModal.present();
  }
}
