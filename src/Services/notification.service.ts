import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: ToastrService) { }


  Success(message:string) {
    this.notification.success(message,'Success');
  }

  Error(message:string) {
    this.notification.error(message,'Error');
  }

  Warning(message:string) {
    this.notification.warning(message,'Warning');
  }

  Info(message:string) {
    this.notification.info(message,'Information');
  }

}
