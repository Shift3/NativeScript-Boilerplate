import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  public userName: string;
  public userPassword: string;

  constructor() { }

  public get isLogged(): boolean {
      return !!this.userName && !!this.userPassword;
  }

  public login(userName: string, userPassword: string) {
      this.userName = userName;
      this.userPassword = userPassword;
  }
  
  ngOnInit() {
  }

}
