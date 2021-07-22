import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { IJobSeeker } from 'src/app/shared/Models/INaukri/IJobSeeker';
import { DesignChangeService } from 'src/app/shared/Services/design-change.service';
import { RegistrationService } from 'src/app/shared/Services/registration.service';
import { dateValidation } from 'src/app/shared/Validations/DateValidation';
import { stringValidation } from 'src/app/shared/Validations/StringValidation';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
 
  hide : boolean = false;
  Employment : FormGroup;
  PreviousEmployment : FormGroup;
  outsideIndia : boolean = false;
  JobSeeker : Array<IJobSeeker>;

  constructor(private router : Router, private fb : FormBuilder, private service : RegistrationService, private dialog : MatDialog, private designService : DesignChangeService) { 
    this.Employment = this.fb.group({
      JobSeekerDesignation : ['', Validators.required],
      JobSeekerCompany : ['', Validators.required],
      JobSeekerAnnualSalary : ['', Validators.required],
      JobSeekerWorkingFrom : ['', Validators.compose([Validators.required])],
      JobSeekerWorkingTo : ['', Validators.required],
      JobSeekerCurrentCity : ['', Validators.required],
      IsCurrent : [''],
    });
    this.PreviousEmployment = this.fb.group({
      JobSeekerDesignation : ['', Validators.compose([Validators.required])],
      JobSeekerCompany : ['', Validators.required],
      JobSeekerAnnualSalary : ['', Validators.required],
      JobSeekerWorkingFrom : ['', Validators.compose([Validators.required])],
      JobSeekerWorkingTo : ['', Validators.required],
      JobSeekerCurrentCity : ['', Validators.required],
      IsCurrent : [''],
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('event') == 'professional'){
      this.hide = true;
    }
    else{
      this.hide = false;
    }
  }

  isValidInput(fieldName): boolean {
    return this.Employment.controls[fieldName].invalid &&
      (this.Employment.controls[fieldName].dirty || this.Employment.controls[fieldName].touched);
  }

  register(){
    console.log(this.Employment.getRawValue());
    console.log(this.PreviousEmployment.getRawValue());
    this.JobSeeker = JSON.parse(localStorage.getItem('registerDetails'));
    let employmentDateFrom = new Date(this.Employment.get('JobSeekerWorkingFrom').value);
    let employmentDateTo = new Date(this.Employment.get('JobSeekerWorkingTo').value);
    let previousEmploymentDateFrom = new Date(this.PreviousEmployment.get('JobSeekerWorkingFrom').value);
    let previousEmploymentDateTo = new Date(this.PreviousEmployment.get('JobSeekerWorkingTo').value);
    if(this.PreviousEmployment.get('JobSeekerDesignation').value == "" || this.PreviousEmployment.get('JobSeekerCompany').value == "" || this.PreviousEmployment.get('JobSeekerAnnualSalary').value == "" || this.PreviousEmployment.get('JobSeekerWorkingFrom').value == "" || this.PreviousEmployment.get('JobSeekerWorkingTo').value == "" || this.PreviousEmployment.get('JobSeekerCurrentCity').value == ""){
      if(employmentDateFrom.getTime() > employmentDateTo.getTime()){
        alert("Please enter proper Employment Dates");
        this.Employment.get('JobSeekerWorkingFrom').reset();
        this.Employment.get('JobSeekerWorkingTo').reset();
        window.location.reload();
      }
      else{
        this.Employment.patchValue({IsCurrent : 1});
        this.Employment.patchValue({JobSeekerAnnualSalary : `${this.Employment.get('JobSeekerAnnualSalary').value}.00`});
        this.JobSeeker.find(value => value.jobSeekerJobHistories = [this.Employment.getRawValue()]);
        console.log(this.JobSeeker);
      }
    }
    else{
      if(employmentDateFrom.getTime() > employmentDateTo.getTime() || previousEmploymentDateFrom.getTime() > previousEmploymentDateTo.getTime() || employmentDateTo.getTime() > previousEmploymentDateTo.getTime()){
        alert("Please enter propers Employment Dates");
        this.Employment.get('JobSeekerWorkingFrom').reset();
        this.Employment.get('JobSeekerWorkingTo').reset();
        this.PreviousEmployment.get('JobSeekerWorkingFrom').reset();
        this.PreviousEmployment.get('JobSeekerWorkingTo').reset();
        window.location.reload();
      }
      else{
        this.Employment.patchValue({IsCurrent : 1});
        this.PreviousEmployment.patchValue({IsCurrent : 0});
        this.Employment.patchValue({JobSeekerAnnualSalary : `${this.Employment.get('JobSeekerAnnualSalary').value}.00`});
        this.PreviousEmployment.patchValue({JobSeekerAnnualSalary : `${this.PreviousEmployment.get('JobSeekerAnnualSalary').value}.00`});
        this.JobSeeker.find(value => value.jobSeekerJobHistories = [this.Employment.getRawValue(), this.PreviousEmployment.getRawValue()]);
        console.log(this.JobSeeker);
      }
    }
    if(this.Employment.get('JobSeekerWorkingFrom').value == null || this.Employment.get('JobSeekerWorkingTo').value == null || this.PreviousEmployment.get('JobSeekerWorkingFrom').value == null || this.PreviousEmployment.get('JobSeekerWorkingTo').value == null){
      return null;
    }
    else{
      console.log(this.service.registerJobSeeker(this.JobSeeker[0])
      .subscribe((data : any) => {
        this.JobSeeker.push(data);
        alert('Registered successfully');
        this.router.navigate(['']);
        this.dialog.open(LoginComponent, {height: '70%', width: '500px'});
        this.designService.setChange('/', 0);
      }));
      console.log(this.JobSeeker);
    }
  }
}