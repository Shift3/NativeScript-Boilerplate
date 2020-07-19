import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import {
    AuthRoutingModule,
    authComponents
} from '@features/auth/auth-routing.module';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
    declarations: [
        authComponents
    ],
    imports: [
        AuthRoutingModule,
        NativeScriptCommonModule
    ]
})
export class AuthModule { }
