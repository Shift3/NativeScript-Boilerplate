import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ngx-fonticon';

import {
    FeatureRoutingModule,
    featureComponents
} from '@features/feature-routing.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
    providers: [TNSFontIconService],
    declarations: [
        featureComponents
    ],
    imports: [
        FeatureRoutingModule,
        TNSFontIconModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule
    ]
})
export class FeatureModule { }
