import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JobSeekerService } from '../shared/Services/job-seeker.service';
import { emailValidation } from '../shared/Validations/EmailValidation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  fieldTextType : boolean = false;
  ForgotPassword : FormGroup;

  constructor(private fb : FormBuilder, private jobSeekerService : JobSeekerService, private dialog : MatDialog) { 
    this.ForgotPassword = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidation()])]
    });
  }

  ngOnInit(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  isValidInput(fieldName): boolean {
    return this.ForgotPassword.controls[fieldName].invalid &&
      (this.ForgotPassword.controls[fieldName].dirty || this.ForgotPassword.controls[fieldName].touched);
  }

  onSubmit(){
    console.log(this.jobSeekerService.forgotPassword(this.ForgotPassword.get('email').value)
    .subscribe(() => {
      alert('Password sent to your email');
      this.dialog.closeAll();
    }));
  }

}
