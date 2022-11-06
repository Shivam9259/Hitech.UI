import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public MobileNo: string;
  UserType:string="";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.UserType = this.route.snapshot.queryParamMap.get('UserType') || "press";
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(this.MobileNo)
    }
  }

  onlyNumberKey(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

}
