import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignChangeService {

  subject = new Subject();
  id : number;

  constructor() { }

  setChange(url : string, id : number){
    console.log(url);
    this.id = id;
    this.subject.next(url);
  }
}
