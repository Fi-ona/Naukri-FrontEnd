import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { DesignChangeService } from 'src/app/shared/Services/design-change.service';
import { RegistrationService } from 'src/app/shared/Services/registration.service';

@Component({
  selector: 'app-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.css']
})
export class RegisterNowComponent implements OnInit, OnDestroy {

  register : boolean = true;

  constructor(public router : Router, private service : RegistrationService, private dialog : MatDialog, private designService : DesignChangeService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
            if(this.router.url != '/registerNow'){
              if(localStorage.getItem('toggle') == 'false'){
                this.register = true;
              }
            } 
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.designService.setChange('/', 0);
  }

  ngOnInit(): void {
    this.designService.setChange(this.router.url, 0);
  }

  change(value : any) { 
    this.service.eventChange(value);
    this.register = false;
  }

  login(){
    this.dialog.open(LoginComponent, {height: '70%', width: '500px'});
  }

}
