import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse, CustomStatusCode } from 'src/Models/Common';
import { RegisterUser, User } from 'src/Models/User';
import { AuthService } from 'src/Services/auth.service';
import { CommonService } from 'src/Services/common.service';
import { NotificationService } from 'src/Services/notification.service';
import { PopupModalComponent } from '../Shared/popup-modal/popup-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserType: string = "";
  title: string = '';
  statesList: any[]
  cityList: any[]
  _commonService: any;
  _authService: any;
  submitted: boolean = false;
  selectedStateId: number = 0
  ErrorMessage: string = ""

  registerForm!: FormGroup;
  @ViewChild('Form', { static: false }) myForm: NgForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private notification: NotificationService) {
    this._authService = authService;
    this._commonService = commonService;
  }

  ngOnInit(): void {
    this.UserType = this.route.snapshot.queryParamMap.get('UserType') || "";
    if (this.UserType != 'dist' && this.UserType != 'press') {
      this.router.navigateByUrl('/register?UserType=press');
    }
    this.title = this.UserType == 'dist' ? "Distributer" : "Printing Press";


    this.registerForm = new FormGroup({
      BusinessName: new FormControl("", [
        Validators.required
      ]),
      Name: new FormControl("", [
        Validators.required
      ]),
      State: new FormControl(0, [
        Validators.required
      ]),
      City: new FormControl(0, [
        Validators.required
      ]),
      PinCode: new FormControl("", [
        Validators.required,
        Validators.pattern('^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$'),
      ]),
      GstNo: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'),
      ]),
      Mobile: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      Email: new FormControl("", [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'),
      ]),
      Password: new FormControl("", [
        Validators.required
      ]),
      Address: new FormControl("", [
        Validators.required
      ]),
    });


    this.loadStates();
  }

  loadStates() {
    this._commonService.StatesList().subscribe((response: any) => {
      this.statesList = response.data;
    });


  }

  loadCity() {
    if (this.registerForm.value.State == 0)
      return
    this._commonService.CityList(this.registerForm.value.State).subscribe((response: any) => {
      this.cityList = response.data;
    });

  }


  onSubmit(formData: any) {
    let form: any = formData.form.controls
    this.submitted = true;
    if (formData.valid) {
      let user = new RegisterUser();
      user.BusinessName=form.BusinessName.value.trim();
      user.Name=form.Name.value.trim();
      user.State=this.statesList.find(s => s.id === Number.parseInt(form.State.value))?.name; 
      user.City=form.City.value.trim();
      user.PinCode=form.PinCode.value.trim();
      user.GstNo=form.GstNo.value.trim();
      user.Mobile=form.Mobile.value.trim();
      user.Email=form.Email.value.trim();
      user.Password=form.Password.value.trim();
      user.Address=form.Address.value.trim();
      user.RoleId=this.UserType == 'dist' ? 2 : 3;
      this._authService.Register(user).subscribe((response: ApiResponse) => {
        console.log(response)
        if(response.statusCode===CustomStatusCode.Success){
          this.notification.Success(response.message);
          this.resetForm();
        }
        this.toggleError();
      });
    }
    else {
      this.toggleError("Please enter all (*) required field.");
    }
  }

  onlyNumberKey(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  resetForm() {
    this.submitted = false;
    this.myForm.resetForm();
  }

  toggleError(msg: string = "") {
    this.ErrorMessage = msg;
  }

}
