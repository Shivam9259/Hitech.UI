import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserType:string="";
  UserEmail:string="";
  UserPassword:string="";

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.UserType = this.route.snapshot.queryParamMap.get('UserType') || "";
    if(this.UserType!='dist' && this.UserType!='press')
    {
      this.router.navigateByUrl('/login?UserType=press');
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(this.UserEmail)
      console.log(this.UserPassword)
    }
  }

}
