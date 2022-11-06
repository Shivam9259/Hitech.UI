import { Injectable } from '@angular/core';
import { MyHttpService } from './MyHttp.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
  constructor(private http: MyHttpService) {

  }

  public StatesList(){
    return this.http.Get('Common/StatesList');
  }

  public CityList(StateId:number){
    return this.http.Get('Common/CityList?StateId='+StateId);
  }
}
