import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {Login, Register} from '../interfaces/interfaces';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService:DataService,private cookieService:CookieService,public router: Router) { }
  isAuth():Promise<any>{
    return new Promise<any>((rej,res)=>{
      rej(this.dataService.auth);
    });
  }
  logout(){
    this.cookieService.delete('token');
    this.router.navigate(['/auth']);

  }
  login(auth:Login){
    this.dataService.send('login',auth).then(data=>{
      if (data['token']){
        this.cookieService.set( 'token', data['token'] );
        this.dataService.auth = true;
        this.router.navigate(['/']);
      }
    });
  }
  register(reg:Register){
    this.dataService.send('register',reg).then(data=>{
      if (data&&data['token']){
        this.cookieService.set( 'token', data['token'] );
        this.dataService.auth = true;
        this.router.navigate(['/']);
      }
    });
  }
}
