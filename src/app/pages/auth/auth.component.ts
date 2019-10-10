import { Component, OnInit } from '@angular/core';
import {Login, Register} from '../../interfaces/interfaces';
import {AuthService} from 'src/app/_services/auth.service';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public type = 'login';
  auth:Login = <Login>{};
  reg:Register = <Register>{};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  login(){
    this.authService.login(this.auth)
  }
  register(){
    this.authService.register(this.reg)
  }
}
