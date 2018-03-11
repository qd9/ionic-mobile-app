import { Component, Input, Output,EventEmitter } from '@angular/core';
import { NavController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'account-nickname-item',
  templateUrl: 'account-nickname-item.html'
})
export class AccountNicknameItemComponent {

  nicknameForm: FormGroup;

  @Input()
  public accountType:any;
  @Input()
  public accountTypeLabel:string;
  @Input()
  public hideAccountGroup:boolean = true;

  @Output()
  change = new EventEmitter();
  @Input()
  public array:any = [];
  @Input()
  public array1:any = [];

  constructor(private navCtrl:NavController,public fb: FormBuilder) {
    // this.nicknameForm = fb.group({
    //   nickName: ['', [Validators.maxLength(20)]]
    // })
  }

  ngOnChanges(){
   
  }

  mychange(account){
    this.change.emit(this.array.push(account.accountMask));
    this.change.emit(this.array1.push(account.nickname))
    console.log(this.array);
    console.log(this.array1)
    
  }
}
