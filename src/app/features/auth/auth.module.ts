import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';

import {
    AuthRoutingModule,
    authComponents
} from '@features/auth/auth-routing.module';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
    providers: [TNSFontIconService],
    declarations: [
        authComponents
    ],
    imports: [
        AuthRoutingModule,
        TNSFontIconModule,
        NativeScriptCommonModule
    ]
})
export class AuthModule { }
