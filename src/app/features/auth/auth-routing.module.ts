import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '@features/auth/login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
    },
];

/**
 * Lazy loaded module for all auth-related routes.
 */
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class AuthRoutingModule { }

export const authComponents = [
    LoginComponent,
];
