import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    },
    {
        loadChildren: () => import('@features/auth/auth.module')
            .then((mod) => mod.AuthModule),
        path: 'auth'
    },
    {
        loadChildren: () => import('@features/feature.module')
            .then((mod) => mod.FeatureModule),
        path: 'feature'
    }
];

@NgModule({
    exports: [NativeScriptRouterModule],
    imports: [NativeScriptRouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
