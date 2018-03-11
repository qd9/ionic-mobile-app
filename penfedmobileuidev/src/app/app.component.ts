import { Component, ViewChild, OnInit} from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { HttpModule } from "@angular/http";
import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import { LogoutProvider } from "../providers/logout/logout"
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";
import { SharedLocalStorageProvider } from "../providers/shared-local-storage/shared-local-storage";
import { Storage } from '@ionic/storage';
// import { Geolocation } from '@ionic-native/geolocation';
// import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ApiService } from "../providers/api-service";


@Component({
  templateUrl: 'app.html',
  providers: [AppSettingsProvider]
})
export class AppComponent implements OnInit {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: any;

  ngOnInit() {
    this.pages = this.appSetting.pages;
  }
  statusBar: any;


  public sessionTimeout: any;
  public sessionTimer: number;
  public isLoggedIn:any;
  public stayLoggedIn:any;
  private islogoutAlertPresent: boolean = false;
  public activeSessionStart:any = null;
  public intervalCheck:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public menuCtrl: MenuController, public http: HttpModule,
    public getTimeout: GetTimeoutValueProvider, public appSetting: AppSettingsProvider,
    public logout: LogoutProvider, public resetAccountsData: ResetAccountsDataProvider,
    public stayloggedInState: SharedLocalStorageProvider, public storage: Storage,
    private alertCtrl: AlertController, private apiService: ApiService, public backgroundMode: BackgroundMode) {

    this.backgroundMode.disable();
    this.sessionTimer = this.getTimeout.getTimeout();

    if (platform.is('android')) {
      platform.ready().then(() => {
        setTimeout(() => {
          splashScreen.hide();
        }, 100);
      });
    }
    if (platform.is('ios')) {
      platform.ready().then(() => {
        setTimeout(() => {
          splashScreen.hide();
        }, 100);
        this.statusBar = statusBar;
        //statusBar.styleDefault();
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#0F2D52');
      });
    }

    // Handle back button navigation on Android
    platform.ready().then(() => {
      // Get RSA device info
      if ((<any>window).rsaInfo) {
        // debugger;
        (<any>window).rsaInfo.getDeviceInfo((data) => {
          console.log('RSA device info');
          this.apiService.rsaDeviceInfo(data);
          this.apiService.rsaSDKOrJS('SDK');
          console.log(data);
        },
        (err) => {
          console.log('RSA device info error');
          console.log(err);
        });
      }
      // Register Android back button action
      platform.registerBackButtonAction(() => {
        // Get current active page
        let activeView = this.nav.getActive().name;
        // let previousView = this.nav.getPrevious().name;
        if (activeView === 'LoginPage') { //AccountsPage
          // console.log('Active page - ', activeView);
          platform.exitApp();
          // navigator['app'].exitApp();
        }
        else if (activeView === 'AccountsPage') { // activeView === 'AccountsPage' this.nav.getViews().length === 2
          if (!this.islogoutAlertPresent) {
            if (this.menuCtrl.isOpen()) { this.menuCtrl.close();}
            let alert = this.alertCtrl.create({
            title: "Log Out & Close?",
            cssClass:'logOutAlertBox',
            subTitle: 'This will log you out and close the session.',
            buttons: [
                {
                  text: 'OK',
                  role: 'OK',
                  handler: () => {
                    this.islogoutAlertPresent = false;
                    this.appLogOut({});
                  }
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log("Alert closed");
                    this.islogoutAlertPresent = false;
                  }
                }
              ]
            });
            alert.present().then(()=>{
              this.islogoutAlertPresent = true;
            });
            platform.pause.subscribe(() => {
              alert.dismiss();
            });
          }
        }
        else if (this.nav.canGoBack()) {
          this.nav.pop();
        }
      });
    });

    this.stayloggedInState.sharedLocalStorageData.subscribe(res => {
      this.stayLoggedIn = res;
    });

    platform.pause.subscribe(() => {
      this.sessionTimeout = new Date();
      console.log('pause app', this.sessionTimeout);
    });

    platform.resume.subscribe(() => {
      let message: string;

      this.activeSessionStart = new Date();
      this.storage.ready().then(() => {
        this.storage.get('stayLoggedIn').then(stayResp => {
            let timeIn: any = new Date();
            this.storage.get('isLoggedIn').then(isLoggedInResp => {
              this.isLoggedIn = isLoggedInResp;
                message = isLoggedInResp !== null ?
                  stayResp ? 'Your session has timed out. Please log in again to continue.' : "You've been logged out of the PenFed app due to your security settings. Please log in again. To stay logged in, visit the settings screen from the navigation."
                  : null;
            }).then(() => {
                if (stayResp && this.isLoggedIn) {
                  //If Stay Logged In is True, calculate timer to see if you can continue, unless the time runs out.
                  if ((timeIn.getTime() - this.sessionTimeout.getTime()) < this.sessionTimer) {
                    console.log('still active');
                  } else {
                    this.logout.sessionLogout().subscribe(res => {
                      // console.log(res);
                    }, err => {

                    }, () => {

                    });
                    // this.resetAccountsData.resetData();
                    // let alert = this.alertCtrl.create({
                    //   title: "We're sorry.",
                    //   subTitle: message,
                    //   buttons: ['Ok']
                    // });
                    // alert.present();
                    // this.resetIsLoggedIn();
                    // this.nav.push(LoginPage)
                    this.resetAndGoToLoginPage(message)
                  }
                } else if (!stayResp && this.isLoggedIn) {
                  //If Stay Logged In is false, Logout if the app goes to background.
                  this.logout.sessionLogout().subscribe(res => {
                    // console.log(res);
                  });
                  // this.resetAccountsData.resetData();
                  // let alert = this.alertCtrl.create({
                  //   title: "We're sorry.",
                  //   subTitle: message,
                  //   buttons: ['Ok']
                  // });
                  // alert.present();
                  // this.resetIsLoggedIn();
                  // this.nav.push(LoginPage)
                  this.resetAndGoToLoginPage(message)
                }
              });
          })
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }

  appLogOut(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(LoginPage).then(()=>{
      this.logout.sessionLogout().subscribe(res => {
        console.log('Log Out');
      }, err =>{
        //The current app returns an error once you call the logout endpoint. TODO - follow up on service endpoint
        console.log('Log Out Error');
      });
      this.resetAccountsData.resetData();
      this.resetIsLoggedIn();
      this.menuCtrl.close('sideMenu');
    });
  }

  goToPage(sub) {
    this.nav.setRoot(sub.component);
  }

  // submenu dropdown collapse
  getMenuActive(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return false;
    }
  }
  // dropdown change color
  getSideNav(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return this.menuCtrl.isOpen('sideMenu');
    }
  }
  // only one dropdown can be toggled
  dropDownCtrl(p) {
    if (p.flag) {
      p.flag = false;
    } else {
      this.appSetting.resetFlag();
      p.flag = true;
    }
  }
  //when menu close, reset all flag
  resetMenu() {
    this.appSetting.resetFlag();
  }

  resetIsLoggedIn(){
    this.storage.get('isLoggedIn').then(isLoggedInResp => {
      if (isLoggedInResp !== null){
        this.isLoggedIn = undefined;
        this.storage.remove('isLoggedIn');
      }
    })
  }
  checkSession(event){

    //Check to see if isLoggedIn is set
    if ((this.isLoggedIn === undefined) || (this.isLoggedIn === null)){
      this.storage.get('isLoggedIn').then(isLoggedInResp => {
        // If it is available, check to see if logged in or not
        if (isLoggedInResp !== null){
          this.isLoggedIn = isLoggedInResp;
        }
      });
    }
    //if isLoggedIn is true, check to see if session is still active
    if (this.isLoggedIn === true){
      //Get the date right now
      let date = new Date();
      // Check to see if global activeSessionStart is set
      if ((this.activeSessionStart === null) || (this.activeSessionStart === undefined)){
        this.activeSessionStart = new Date();
      }
      // If active session time between each tap is less than the overall session time of 10 minutes, continue;
      if ((date.getTime() - this.activeSessionStart.getTime()) < this.sessionTimer){
        this.activeSessionStart = new Date();
      } else{
        //Otherwise, reset and log out
        this.resetAndGoToLoginPage('Your session has timed out. Please log in again to continue.')
      }
    }
  }
  resetAndGoToLoginPage(alertMsg){
    if (alertMsg === undefined) alertMsg = 'Your session has timed out. Please log in again to continue.';
    this.activeSessionStart = null;
    this.resetAccountsData.resetData();
    let alert = this.alertCtrl.create({
      title: "We're sorry.",
      subTitle: alertMsg,
      buttons: ['Ok']
    });
    alert.present();
    this.resetIsLoggedIn();
    this.nav.push(LoginPage)
  }
}
