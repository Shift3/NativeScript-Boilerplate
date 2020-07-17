import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '@features/auth/login/login.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        component: LoginComponent,
        data: { title: 'Login' },
        path: 'login'
    }
];

/**
 * Lazy loaded module for all auth-related routes.
 */
@NgModule({
    exports: [NativeScriptRouterModule],
    imports: [NativeScriptRouterModule.forChild(routes)]
})
export class AuthRoutingModule { }

export const authComponents = [
    LoginComponent
];
