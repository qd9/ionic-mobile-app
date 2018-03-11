import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { AccountCheckDisplayPage } from "../account-check-display/account-check-display";

@Component({
  selector:"account-recent-transactions",
  templateUrl:"account-recent-transactions.html"
})

export class AccountRecentTransactionsComponent{
  public accountDetails:any;
  public transactionsResponse:any;
  public recentTransactions:any[] = [];
  public loanTransactions:any;
  public mortgageDetails:any;
  public loading:boolean = true;
  constructor(public navParams: NavParams, public navCtrl: NavController, private api:AccountsServiceProvider, private sharedMortgageData: SharedMortgageDataProvider){
    this.accountDetails = this.navParams.data.payload;
  }
  ngOnInit(){
    this.api.getRecentTransactions(this.accountDetails.accountMask).subscribe(res=>{
      let resultJson:any = res;
      if (this.navParams.data.payload.parentAcctType === 'MORTGAGE'){
        this.sharedMortgageData.shareMortgageData(resultJson);
        // Remember to null check, as some responses are not clean or empty objects or arrays
        this.transactionsResponse = resultJson || {};
        this.recentTransactions = this.transactionsResponse.transactions || [];
      } else {
        this.recentTransactions = resultJson.transactions || [];
      }
      this.loading = false;
    })
  }
  displayCheck(checkDetails) {
    this.navCtrl.push(AccountCheckDisplayPage,{
      pageType:'CHECK_DISPLAY_PAGE',
      accountMask:this.navParams.data.payload.accountMask,
      payload: checkDetails
    })
  }
}