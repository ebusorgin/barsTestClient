import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Files} from '../interfaces/interfaces';

export interface Message {
  method: string,
  data: any,
  requestId: number,

}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  auth = false;
  ws: any;
  ready = false;
  requestId: number = 0;
  req = {};
  myfiles:Files[] = []
  allfiles:Files[] = []
  public messages = {
    'EVENT/createInitOrder': new EventEmitter(),
    'EVENT/cancelOrder': new EventEmitter(),
    'EVENT/options': new EventEmitter(),

  };
  private message = <Message>{};
  constructor(private cookieService: CookieService,public router: Router) {
    this.connectWs();
    console.log('START WS');
  }
  connectWs() {
    this.ws = new WebSocket('ws://localhost:7001');
    this.ws.onclose = (event)=> {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
      this.ready = false;
      setTimeout(function() {
        this.connectWs();
      }.bind(this), 3000);
      console.log('disconnect');
    };

    this.ws.onmessage = function(res){

      let data = JSON.parse(res.data);

      console.log('RES SERVER ', data);
      if (!data.data||data.error) {
        if (data.error.hasOwnProperty('code')&&data.error.code==0){return;}
        alert(data.error.info)
        return
      }

      if (this.req[data.requestId]) {
        this.req[data.requestId].emit(data.data);
      } else {
        let m = data.method.split('/');
        if (this.messages[m[1] + '/' + m[2]]){
          this.messages[m[1] + '/' + m[2]].emit(data.data);
        }else{
          console.log('INCOMING MESS',data);
        }

      }


    }.bind(this);

    this.ws.onerror = (error) =>{
      console.log('Ошибка ' , error);
    };
    this.ws.onopen = function (data) {
      console.log('CONNECT',this.ready);
      this.ready = true;

      if (this.cookieService.get('token')&&!this.auth){
        this.send('login',{token:this.cookieService.get('token')}).then(data=>{
        if (data){
          this.auth = true;
          this.router.navigate(['/']);
        }
        });
      }
    }.bind(this);





  }
  send<T>(method: string, data: any) {
    this.requestId++;
    this.message = <Message>{
      method: method,
      data: data,
      error: null,
      requestId: this.requestId
    };
    this.req[this.requestId] = new EventEmitter();
    try {
      this.ws.send(JSON.stringify(this.message));
    }catch (e) {

    }

    console.log('SEND TO SERVER ', this.message);
    return new Promise((resolve, reject) => {
      this.req[this.requestId].subscribe((data:T) => {
        return resolve(<T>data);
      });
    });
  }
}
