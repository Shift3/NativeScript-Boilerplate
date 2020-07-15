import { NgModule } from '@angular/core';

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
        AuthRoutingModule
    ]
})
export class AuthModule { }
