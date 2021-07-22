import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IJobSeeker } from 'src/app/shared/Models/INaukri/IJobSeeker';
import { JobSeekerService } from 'src/app/shared/Services/job-seeker.service';

@Component({
  selector: 'app-login-home-page',
  templateUrl: './login-home-page.component.html',
  styleUrls: ['./login-home-page.component.css']
})
export class LoginHomePageComponent implements OnInit, OnDestroy {

  jobSeekerId : number;
  token : string;
  jobSeeker : Array<IJobSeeker> = [];
  loggedIn : Array<any> = [];
  displayUpdateProfile : boolean = true;

  constructor(private jobSeekerService : JobSeekerService, private router : Router) { 
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          if(this.router.url != '/'){
            if(localStorage.getItem('toggle') == 'false'){
              this.displayUpdateProfile = true;
            }
          }
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.displayUpdateProfile = true;
  }

  ngOnInit(): void {
    if(this.router.url == '/home/updateProfile'){
      this.displayUpdateProfile = false;
    }
    else{
      this.displayUpdateProfile = true;
    }
    this.loggedIn.push(JSON.parse(sessionStorage.getItem('loggedIn')));
    console.log(this.loggedIn);
    this.loggedIn.filter(x => this.jobSeekerId = x.id);
    this.loggedIn.filter(x => this.token = x.token);
    this.jobSeekerService.getJobSeeker(this.jobSeekerId, this.token).subscribe(data => this.jobSeeker.push(data));
    this.jobSeekerService.particularProfile(this.jobSeeker);
    console.log(this.jobSeeker);
  }

  updateProfile(){
    this.router.navigate(['home/updateProfile']);
    this.displayUpdateProfile = false;
  }

}
