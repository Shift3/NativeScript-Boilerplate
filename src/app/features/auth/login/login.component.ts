import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ns-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public userName: string;
    public userPassword: string;

    public get isLogged(): boolean {
        return Boolean(this.userName) && Boolean(this.userPassword);
    }

    public login(userName: string, userPassword: string): void {
        this.userName = userName;
        this.userPassword = userPassword;
    }

}
