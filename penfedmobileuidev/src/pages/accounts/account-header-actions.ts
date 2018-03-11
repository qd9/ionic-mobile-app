import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import { PaymentsPage } from "../payments/payments";
import { ActivateCardPage } from "../activate-card/activate-card";
// import { AccountsPage } from "../accounts";

@Component({
  selector:"account-header-actions",
  templateUrl:"account-header-actions.html"
})
export class AccountHeaderActionsComponent{
public actionsParams:any;
  constructor(private navParams:NavParams, private navCtrl:NavController){
    this.actionsParams = this.navParams.data;
  }
  goToPayments(){
    this.navCtrl.push(PaymentsPage,
      {
      payload:this.actionsParams.payload
    });
  }
  gotToActivateCard(){
    this.navCtrl.push(ActivateCardPage,
      {
      payload:this.actionsParams.payload
    });
  }
}
