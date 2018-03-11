import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountUnlockedPage } from './account-unlocked';

@NgModule({
  declarations: [
    AccountUnlockedPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountUnlockedPage),
  ],
  exports: [
    AccountUnlockedPage
  ]
})
export class AccountUnlockedPageModule {}
