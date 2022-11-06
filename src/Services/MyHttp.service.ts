import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, first, map, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor(private http: HttpClient,private notification:NotificationService) {

  }

  getTokenHeaders(): HttpHeaders {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', '*');
    return headers;
  }

  Get(url: string) {
    var headers = this.getTokenHeaders();
    let finalUrl = environment.apiUrl + url;
    return this.http.get(finalUrl, { headers: headers })
      .pipe
      (map((res: any) => {
        if(res.statusCode==0)
        this.notification.Error(res.message)
        return res;
      }),
        catchError(err => { return of(`this is ${err}`) })
      );
  }

  Post(url: string, param: any) {
    var headers = this.getTokenHeaders();
    let finalUrl = environment.apiUrl + url;
    return this.http.post(finalUrl, param, { headers: headers })
      .pipe
      (map((res: any) => {
        if(res.statusCode==0)
        this.notification.Error(res.message)
        return res;
      }),
        catchError(err => { return of(`this is ${err}`) })
      );
  }
}
