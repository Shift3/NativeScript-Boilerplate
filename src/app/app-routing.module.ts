import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('@features/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'feature',
        loadChildren: () => import('@features/feature.module').then((m) => m.FeatureModule),
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
