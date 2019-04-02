import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

	private submitMessageEventSource = new BehaviorSubject('');
	public submitMessageEventObservable = this.submitMessageEventSource.asObservable();

  constructor() { }

  emitSubmitMessage(msgType: string) {
	this.submitMessageEventSource.next(msgType);
  }
}