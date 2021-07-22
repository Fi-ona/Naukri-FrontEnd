import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { IJobSeeker } from 'src/app/shared/Models/INaukri/IJobSeeker';
import { RegistrationService } from 'src/app/shared/Services/registration.service';
import { dateValidation } from 'src/app/shared/Validations/DateValidation';
import { emailValidation } from 'src/app/shared/Validations/EmailValidation';
import { phoneValidation } from 'src/app/shared/Validations/PhoneValidation';
import { pinValidation } from 'src/app/shared/Validations/PinValidation';
import { stringValidation } from 'src/app/shared/Validations/StringValidation';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  hide: boolean = false;
  fieldTextType: boolean = false;
  Personal: FormGroup;
  JobSeeker: Array<IJobSeeker> = [];
  outsideIndia: boolean = false;

  constructor(private router: Router, private service: RegistrationService, private fb: FormBuilder) {
    this.Personal = this.fb.group({
      jobSeekerFirstName: ['', Validators.compose([Validators.required, stringValidation(), Validators.maxLength(15)])],
      jobSeekerMiddleName: ['', Validators.compose([Validators.required, stringValidation(), Validators.maxLength(15)])],
      jobSeekerLastName: ['', Validators.compose([Validators.required, stringValidation(), Validators.maxLength(15)])],
      jobSeekerEmail: ['', Validators.compose([Validators.required, emailValidation()])],
      jobSeekerPassword: ['', Validators.compose([Validators.required, Validators.pattern("")])],
      jobSeekerType: [''],
      jobSeekerPhoneNumber: ['', Validators.compose([Validators.required, phoneValidation()])],
      jobSeekerResume: ['', Validators.required],
      jobSeekerSkills: ['', Validators.required],
      jobSeekerDob: ['', Validators.compose([Validators.required, dateValidation()])],
      jobSeekerGender: [''],
      jobSeekerAddress: ['', Validators.required],
      jobSeekerAreaPinCode: ['', Validators.compose([Validators.required, pinValidation()])],
      jobSeekerProjects: ['', Validators.required]
    });
    if (this.service.geteventValue == 'professional') {
      this.hide = true;
      localStorage.setItem('event', 'professional');
    }
    else if (this.service.geteventValue == 'fresher') {
      localStorage.setItem('event', 'fresher');
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('event') == 'professional') {
      this.hide = true;
    }
    else {
      this.hide = false;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  isValidInput(fieldName): boolean {
    return this.Personal.controls[fieldName].invalid &&
      (this.Personal.controls[fieldName].dirty || this.Personal.controls[fieldName].touched);
  }

  pinCode(address) {
    switch (address) {
      case "Ahmedabad":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^38[0-9]{4}$")) {
          alert("Ahmedabad pincode starts from 38");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "New Delhi":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^11[0-9]{4}$")) {
          alert("New Delhi pincode starts from 11");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Gurgaon":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^12[0-9]{4}$")) {
          alert("Gurgaon pincode starts from 12");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Mumbai":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^40[0-9]{4}$")) {
          alert("Mumbai pincode starts from 40");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Bangalore":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^56[0-9]{4}$")) {
          alert("Bangalore pincode starts from 56");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Hyderabad":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^50[0-9]{4}$")) {
          alert("Hyderabad pincode starts from 50");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Chennai":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^60[0-9]{4}$")) {
          alert("Chennai pincode starts from 60");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Kolkata":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^70[0-9]{4}$")) {
          alert("Kolkata pincode starts from 70");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Pune":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^41[0-9]{4}$")) {
          alert("Pune pincode starts from 41");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      case "Noida":
        if (!this.Personal.get('jobSeekerAreaPinCode').value.toString().match("^20[0-9]{4}$")) {
          alert("Noida pincode starts from 20");
          this.Personal.get('jobSeekerAreaPinCode').reset();
        }
        break;
      default:
        break;
    }
  }

  next() {
    console.log(this.Personal.getRawValue());
    if (localStorage.getItem('event') == 'professional') {
      this.Personal.patchValue({ jobSeekerType: 'Professional' });
    }
    else if (localStorage.getItem('event') == 'fresher') {
      this.Personal.patchValue({ jobSeekerType: 'Fresher' });
    }
    this.JobSeeker.push(this.Personal.getRawValue());
    console.log(this.JobSeeker);
    localStorage.setItem('registerDetails', JSON.stringify(this.JobSeeker));
    this.router.navigate(['/registerNow/education']);
  }

}
