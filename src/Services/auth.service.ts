
import { Injectable } from '@angular/core';
import { User } from 'src/Models/User';
import { MyHttpService } from './MyHttp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: MyHttpService) {

  }

  public Register(user: User) {
    return this.http.Post('Home/Register', user);
  }

  public Login(Mobile: string, Password: string) {
    return this.http.Post('Home/Login', { Mobile, Password });
  }
}
