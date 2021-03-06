import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReleaseService } from '@infrastructure/services/release.service';

/*
 * Uncomment and add to NgModule imports if you need to use two-way binding
 * import { NativeScriptFormsModule } from "nativescript-angular/forms";
 *
 * Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
 * import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
 */

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        TNSFontIconModule.forRoot({
            'fa': require('~/fonts/font-awesome')
        }),
        NativeScriptCommonModule,
        AppRoutingModule
    ],
    providers: [
        ReleaseService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

/*
 * Pass your application module to the bootstrapModule function
 * located in main.ts to start your app
 */
export class AppModule { }
