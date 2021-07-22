import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { IJobSeeker } from 'src/app/shared/Models/INaukri/IJobSeeker';
import { DesignChangeService } from 'src/app/shared/Services/design-change.service';
import { RegistrationService } from 'src/app/shared/Services/registration.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  
  hide : boolean = false;
  Education : FormGroup;  
  PreviousEducation : FormGroup;
  JobSeeker : Array<IJobSeeker>;

  constructor(private router : Router, private fb : FormBuilder, private service : RegistrationService, private dialog : MatDialog, private designService : DesignChangeService) { 
    this.Education = this.fb.group({
      jobSeekerField : ['', Validators.required],
      jobSeekerCollege : ['', Validators.required],
      jobSeekerYearOfCompletion : ['', Validators.required],
    });
    this.PreviousEducation = this.fb.group({
      jobSeekerField : ['', Validators.required],
      jobSeekerCollege : ['', Validators.required],
      jobSeekerYearOfCompletion : ['', Validators.required],
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
    return this.Education.controls[fieldName].invalid &&
      (this.Education.controls[fieldName].dirty || this.Education.controls[fieldName].touched);
  }

  register(){
    console.log(this.Education.getRawValue());
    console.log(this.PreviousEducation.getRawValue());
    this.JobSeeker = JSON.parse(localStorage.getItem('registerDetails'));
    if(this.PreviousEducation.get('jobSeekerField').value == "" || this.PreviousEducation.get('jobSeekerCollege').value == "" || this.PreviousEducation.get('jobSeekerYearOfCompletion').value == ""){
      this.JobSeeker.find(value => value.jobSeekerEducations = [this.Education.getRawValue()]);
      console.log(this.JobSeeker);
    }
    else{
      if(this.PreviousEducation.get('jobSeekerYearOfCompletion').value < this.Education.get('jobSeekerYearOfCompletion').value){
        this.JobSeeker.find(value => value.jobSeekerEducations = [this.Education.getRawValue(), this.PreviousEducation.getRawValue()]);
        console.log(this.JobSeeker);
      }
      else{
        alert("Year of completion for previous year should be less than the Highest Qualification's year of completion!");
        this.PreviousEducation.get('jobSeekerYearOfCompletion').reset();
        this.Education.get('jobSeekerYearOfCompletion').reset();
        window.location.reload();
      }
    }
    if(this.Education.get('jobSeekerYearOfCompletion').value == null || this.PreviousEducation.get('jobSeekerYearOfCompletion').value == null){
      console.log('Hey');
      return null;
    }
    else if(this.hide){
      console.log(this.JobSeeker);
      this.router.navigate(['/registerNow/employment']);
    } 
    else{
      console.log(this.service.registerJobSeeker(this.JobSeeker[0])
      .subscribe((data : any) => {
        this.JobSeeker.push(data);
        alert('Registered successfully');
        localStorage.setItem('registerDetails', JSON.stringify(this.JobSeeker));
        this.router.navigate(['']);
        this.dialog.open(LoginComponent, {height: '70%', width: '500px'});
        this.designService.setChange('/', 0);
      }));
    }
  }
}