import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IJob } from 'src/app/shared/Models/INaukri/IJob';
import { DesignChangeService } from 'src/app/shared/Services/design-change.service';
import { JobSeekerService } from 'src/app/shared/Services/job-seeker.service';

@Component({
  selector: 'app-search-job-results',
  templateUrl: './search-job-results.component.html',
  styleUrls: ['./search-job-results.component.css']
})
export class SearchJobResultsComponent implements OnInit, OnDestroy {

  jobs$ : Array<IJob> = [];
  footer : boolean = true;
  navbar : boolean = true;
  main : boolean = true;
  container : boolean = true;
  jobSearch : boolean = true;
  loggedIn : boolean ;

  constructor(public service : JobSeekerService, private router : Router, private designService : DesignChangeService) { 
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          if(this.router.url != '/'){
            if(localStorage.getItem('toggle') == 'false'){
              console.log('H');
              this.jobSearch = true;
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.jobSearch = true;
  }

  ngOnInit(): void {
    this.designService.setChange(this.router.url, 0);
  }

  detailsPage(){
    this.jobSearch = false;
  }

}
