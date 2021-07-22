import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: BehaviorSubject<boolean>;
  httpUrl = environment.base + "/api/Authenticate/login";
  
  constructor(private http : HttpClient) { }

  login(email: String, password: String): Observable<boolean> {
    var body = {};
    body['email'] = email;
    body['password'] = password;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.httpUrl, body, {headers: headers}).pipe(
      map((response: any) => { 
        console.log(response);
        this.isLogged = response;
        console.log(this.isLogged);
        sessionStorage.setItem('loggedIn', JSON.stringify(this.isLogged));
        return response;
      })
    );
  }
}
