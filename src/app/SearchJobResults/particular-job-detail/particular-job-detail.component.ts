import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoginComponent } from 'src/app/login/login.component';
import { IJob } from 'src/app/shared/Models/INaukri/IJob';
import { IJobSeeker } from 'src/app/shared/Models/INaukri/IJobSeeker';
import { AuthService } from 'src/app/shared/Services/auth.service';
import { DesignChangeService } from 'src/app/shared/Services/design-change.service';
import { JobSeekerService } from 'src/app/shared/Services/job-seeker.service';

@Component({
  selector: 'app-particular-job-detail',
  templateUrl: './particular-job-detail.component.html',
  styleUrls: ['./particular-job-detail.component.css']
})
export class ParticularJobDetailComponent implements OnInit, OnDestroy {

  applyBTN : boolean = false;
  subscription : Subscription;
  job : Array<IJob> = [];
  id;
  experienceNeeded;
  type;
  jobSeeker : Array<IJobSeeker> = [];
  loggedIn : Array<any> = [];

  constructor(private activatedRoute : ActivatedRoute, private jobSeekerService : JobSeekerService, private router : Router, private authService : AuthService, private dialog : MatDialog, private designService : DesignChangeService) {}

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void { 
    if(sessionStorage.getItem('loggedIn') == null){
      console.log('not logged');
    }
    else{
      console.log('logged');
      this.loggedIn.push(JSON.parse(sessionStorage.getItem('loggedIn')));
      this.applyBTN = true;
    }
    
    this.id = this.activatedRoute.snapshot.paramMap.get('jobId');
    
    this.subscription = this.activatedRoute.parent.paramMap.subscribe(() =>{
      let products = JSON.parse(localStorage.getItem('searchResult'));
      products.filter(value => value.data.find(x => (this.id == x.jobId) ? this.job.push(x) : null));
      console.log(this.job);
    });
    
    this.designService.setChange(this.router.url, this.id);
  }

  apply(){
    let compid;
    this.job.forEach(value => compid = value.companyId);
    let jsid = this.loggedIn[0]['id'];
    let token = this.loggedIn[0]['token'];
    console.log(this.loggedIn);
    console.log(this.job);
    this.jobSeekerService.getJobSeeker(jsid, token).subscribe((data) => {
      setTimeout(() => {
        this.jobSeeker.push(data);
        console.log(this.jobSeeker);
        this.type = this.jobSeeker[0]['data'].jobSeekerType;
        localStorage.setItem('event', this.type);
      }, 100)
    });
    this.job.forEach(x => this.experienceNeeded = x.jobExperienceNeeded);
    if(localStorage.getItem('event') == "Fresher" && (this.experienceNeeded == "3-5 years" || this.experienceNeeded == "3-6 years")){
      alert("Sorry! Fresher can't apply for jobs which need more experience");
    }
    else{
      this.jobSeekerService.applyForJob(jsid, compid, this.id, token)
        .subscribe(() => {
          alert('Applied for job');
          this.router.navigate(['']);
          this.designService.setChange('/', 0);
        });
    }
  }

  loginToApply(){
    this.dialog.open(LoginComponent, {height: '70%', width: '500px'});
  }

  registerToApply(){
    this.router.navigate(['registerNow']);
  }

}