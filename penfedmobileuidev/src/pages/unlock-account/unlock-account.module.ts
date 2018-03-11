import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnlockAccountPage } from './unlock-account';

@NgModule({
  declarations: [
    UnlockAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(UnlockAccountPage),
  ],
  exports: [
    UnlockAccountPage
  ]
})
export class UnlockAccountPageModule {}
