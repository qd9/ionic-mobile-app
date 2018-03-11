import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { HelploginPage } from '../pages/helplogin/helplogin';
import { DepositPage } from '../pages/deposit/deposit';
import { ToolsPage } from '../pages/tools/tools';
import { PaymentsPage } from '../pages/payments/payments';
import { ProductsPage } from '../pages/products/products';
import { SettingsPage } from '../pages/settings/settings';
import { UnderConstructionPage } from '../pages/under-construction/under-construction';
import { LogoutPage } from '../pages/logout/logout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { ApiService } from '../providers/api-service';
import { AccountsPage } from '../pages/accounts/accounts';
import { AccountPage } from "../pages/account/account";
import { SecurityPage } from '../pages/security/security';
import { AccountHeaderComponent } from '../pages/accounts/account-header';
import { AccountRecentTransactionsComponent } from "../pages/account/account-recent-transactions";
import { AccountHeaderActionsComponent } from "../pages/accounts/account-header-actions";
import { AccountsFooterComponent } from '../pages/accounts/accounts-footer';
import { AccountListItemComponent } from '../pages/accounts/account-list-item';
import { UpdateMailingAddressPage} from '../pages/update-mailing-address/update-mailing-address';
import { UpdatePhoneNumPage} from '../pages/update-phone-num/update-phone-num';
import { UpdateEmailPage} from '../pages/update-email/update-email';
import { AccountShowhidePage} from '../pages/account-showhide/account-showhide';
import { IonicStorageModule } from '@ionic/storage'
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { InboxPage } from "../pages/inbox/inbox";
import { AccountCheckDisplayPage } from "../pages/account-check-display/account-check-display";
import { CheckingPage } from '../pages/checking/checking';
import { ExplorePage } from '../pages/explore/explore';
import { IrasPage } from '../pages/iras/iras';
import { SavingsPage } from '../pages/savings/savings';
import { CreditCardsPage } from '../pages/credit-cards/credit-cards';
import { AutoLoansPage } from '../pages/auto-loans/auto-loans';
import { MortgagesPage } from'../pages/mortgages/mortgages';
import { OtherVehicleLoansPage } from'../pages/other-vehicle-loans/other-vehicle-loans';
import { PersonalLoansPage } from'../pages/personal-loans/personal-loans';
import { CertificatesPage } from'../pages/certificates/certificates';
import { AccountLockedPage } from '../pages/account-locked/account-locked';
import { UnlockAccountPage } from '../pages/unlock-account/unlock-account';
import { AccountUnlockedPage } from '../pages/account-unlocked/account-unlocked';
import { CreateNewpasswordPage } from '../pages/create-newpassword/create-newpassword';
import { ContactServiceComponent } from '../pages/contact/contact-service';
import { AccountNicknamePage } from '../pages/account-nickname/account-nickname';
import { AccountNicknameItemComponent }from '../pages/account-nickname/account-nickname-item';
import { SecurityLockedPage } from '../pages/security-locked/security-locked';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowhideDirective } from '../directives/showhide/showhide';
import { Network } from '@ionic-native/network';

import { TruncatePipe } from "../pipes/truncate";
import { FormatPrice } from "../pipes/formatPrice";


import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import { SharedMortgageDataProvider } from '../providers/shared-mortgage-data/shared-mortgage-data';

import { ContactInformationProvider } from '../providers/contact-information/contact-information';
import { UpdatePhonenumberServiceProvider } from '../providers/update-phonenumber-service/update-phonenumber-service';
import { UpdatePasswordProvider } from '../providers/update-password/update-password';

import { AccountsServiceProvider } from '../providers/accounts-service/accounts-service';
import { ApiEndpointProvider } from '../providers/api-endpoint/api-endpoint';
import { LogoutProvider } from '../providers/logout/logout';
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";

import { MailingAddressServiceProvider } from '../providers/mailing-address-service/mailing-address-service';
import { CountryStateProvider } from '../providers/country-state/country-state';
import { SecurityquestionPage } from "../pages/securityquestion/securityquestion";
import { FormatAccountNumberPipe } from '../pipes/format-account-number';
import { IsDebitPipe } from "../pipes/is-debit";
//Session Manager
import { SessionManager } from '../pages/core/session-manager';
//App settings for loading all gloabl data before login
import { AppSettings } from '../pages/core/app-settings';
import { SharedLocalStorageProvider } from "../providers/shared-local-storage/shared-local-storage";

import { ProductBaseComponent } from '../components/product-base/product-base';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { ProudctcarouselComponent } from '../components/proudctcarousel/proudctcarousel';
import { ReversevaluePipe } from '../pipes/reversevalue/reversevalue';
import { ProductsExploreProvider } from '../providers/products-explore/products-explore';
import { ManageYourCardsPage } from "../pages/manage-your-cards/manage-your-cards";
import { ActivateCardPage } from "../pages/activate-card/activate-card";
import { Device } from '@ionic-native/device';
import { NetworkInformationProvider } from '../providers/network-information/network-information';
import { UpdateContactInfoProvider } from '../providers/update-contact-info/update-contact-info';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';

import{ DepositsAgreementPage } from '../pages/deposits-agreement/deposits-agreement';
import { AfbaDisclosurePage } from '../pages/afba-disclosure/afba-disclosure';

/*Geo Location Related imports - Start*/
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
/*Geo Location Related imports - End*/
import { BackgroundMode } from "@ionic-native/background-mode";
import { CreditCardDisplayComponent } from "../pages/accounts/account-header-credit-card-display";
import { AccountHeaderAccountDetailsComponent } from "../pages/accounts/account-header-account-details";
import { SecurityQuestionProvider } from '../providers/security-question/security-question';
import { TermsConditionsPopupComponent } from '../components/terms-conditions-popup/terms-conditions-popup';
import { UnlockAccountProvider } from '../providers/unlock-account/unlock-account';
import { PlatformServiceProvider } from '../providers/platform-service/platform-service';

@NgModule({
  declarations: [
    AppComponent,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    ToolsPage,
    PaymentsPage,
    ProductsPage,
    SettingsPage,
    UnderConstructionPage,
    LogoutPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ContactInfoPage,
    AccountHeaderComponent,
    AccountHeaderActionsComponent,
    AccountListItemComponent,
    UpdateMailingAddressPage,
    AccountRecentTransactionsComponent,
    AccountsFooterComponent,
    ShowhideDirective,
    AccountShowhidePage,
    TruncatePipe,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    FormatPrice,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityquestionPage,
    SecurityPage,
    FormatAccountNumberPipe,
    IsDebitPipe,
    InboxPage,
    AccountCheckDisplayPage,
    ProductBaseComponent,
    ProudctcarouselComponent,
    ReversevaluePipe,
    AccountLockedPage,
    UnlockAccountPage,
    ManageYourCardsPage,
    ActivateCardPage,
    AccountUnlockedPage,
    CreateNewpasswordPage,
    //Terms,
    TermsConditionsPage,
    DepositsAgreementPage,
    AfbaDisclosurePage,
    CreditCardDisplayComponent,
    AccountHeaderAccountDetailsComponent,
    TermsConditionsPopupComponent,
    ContactServiceComponent,
    AccountNicknamePage,
    AccountNicknameItemComponent,
    SecurityLockedPage
  ],
  imports: [
    BrowserModule,
    //BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent, {
      scrollAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__nmpp',
      driverOrder: ['websql', 'sqlite', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DepositPage,
    ToolsPage,
    ContactInfoPage,
    PaymentsPage,
    ProductsPage,
    SettingsPage,
    UnderConstructionPage,
    LogoutPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    UpdateMailingAddressPage,
    AccountShowhidePage,
    SecurityquestionPage,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityPage,
    InboxPage,
    AccountCheckDisplayPage,
    AccountLockedPage,
    UnlockAccountPage,
    ManageYourCardsPage,
    ActivateCardPage,
    AccountUnlockedPage,
    CreateNewpasswordPage,
    //Terms,
    TermsConditionsPage,
    DepositsAgreementPage,
    AfbaDisclosurePage,
    TermsConditionsPopupComponent,
    ContactServiceComponent,
    AccountNicknamePage,
    AccountNicknameItemComponent,
    SecurityLockedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Storage,
    Device,
    // Keyboard,
    Geolocation,
    BackgroundGeolocation,
    LocationTrackerProvider,
    ApiService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    GetTimeoutValueProvider,
    SharedMortgageDataProvider,
    ContactInformationProvider,
    UpdatePhonenumberServiceProvider,
    UpdatePasswordProvider,
    LoginPage,
    AccountsServiceProvider,
    ApiEndpointProvider,
    LogoutProvider,
    MailingAddressServiceProvider,
    CountryStateProvider,
    ResetAccountsDataProvider,
    SessionManager,
    AppSettings,
    SharedLocalStorageProvider,
    ResetAccountsDataProvider,
    ProductServiceProvider,
    ProductsExploreProvider,
    NetworkInformationProvider,
    UpdateContactInfoProvider,
    BackgroundMode,
    SecurityQuestionProvider,
    UnlockAccountProvider,
    PlatformServiceProvider
  ]

})
export class AppModule { }
