import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/Services/auth.service';
import { DesignChangeService } from './shared/Services/design-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'FrontEnd';
  footer : boolean = true;
  navbar : boolean = true;
  main : boolean = true;
  container : boolean = true;
  jobSearch : boolean = false;
  loggedIn : boolean ;

  constructor(public router : Router, private dialog : MatDialog, private authService : AuthService, private activatedRoute : ActivatedRoute, public designService : DesignChangeService){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          if(this.router.url == '/'){
            this.main = true;
          }
        }
      }
    });
    if(this.router.url == '/'){
      console.log('Inside loggedin');
      if(sessionStorage.getItem('loggedIn') == null){
        this.loggedIn = false;
      }
      else{
        this.loggedIn = true;
      }
    }
  }
  ngOnInit(): void {
    console.log('Oninit');
    this.designService.subject
      .subscribe((data) => {
        if(data == '/'){
          this.navbar = true;
          this.main = true;
          this.footer = true;
        }
        else if(data == '/searchJobResult'){
          console.log('In search job result');
          this.main = false;
        }
        else if(data == '/registerNow'){
          this.main = false;
          this.navbar = false;
          this.footer = false;
        }
        else if(data == '/home/updateProfile'){
          this.main = false;

        }
        if(sessionStorage.getItem('loggedIn') == null){
          this.loggedIn = false;
        }
        else{
          this.loggedIn = true;
        }
    });
  }

  toggle = false;
  @HostListener('window:scroll', ['$event'])


  onWindowScroll() {
    let element = document.getElementById('navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('onScroll');
    } else {
      element.classList.remove('onScroll');
    }
  }

  openDialogLogin(){
    const dialogRef = this.dialog.open(LoginComponent, {height: '70%', width: '500px'});
    this.router.events.subscribe(() => { 
      dialogRef.close();
    });
  }

  logout(){
    sessionStorage.removeItem('loggedIn');
    this.loggedIn = false;
  }

  editProfile(){
    this.router.navigate(['home/updateProfile']);
  }
}
