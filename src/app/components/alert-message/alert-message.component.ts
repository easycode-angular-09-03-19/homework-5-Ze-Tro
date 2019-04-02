import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  message:string;
  visibility = false;
  msgClassType: string;

  constructor(
    public alertMessageService: AlertMessageService
  ) {}

  ngOnInit() {
    this.alertMessageService.submitMessageEventObservable.subscribe((msgType: string) => {
    this.showMessage(msgType);
    })
  }

  showMessage(msgType: string) {
 
    switch(msgType) {
      case 'submit':
        this.message = 'Album successfully added';
        this.msgClassType = 'success';
        break;
      case 'deleteTrue':
        this.message = 'Album deleted successfully';
        this.msgClassType = 'danger';
        break;
      case 'deleteFalse':
        this.message = 'Album not deleted';
        this.msgClassType = 'warning';
        break;
      case 'update':
        this.message = 'Album updated';
        this.msgClassType = 'success';
        break;
      case 'cancel':
        this.message = 'Update aborted';
        this.msgClassType = 'warning';
        break;
      default:
        break;
    }

    this.visibility = true;
      
    setTimeout(() => {
      this.visibility = false; 
      this.message = '';
    }, 3000);
  }
}
  