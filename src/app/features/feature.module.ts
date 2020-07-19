import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {
    FeatureRoutingModule,
    featureComponents
} from '@features/feature-routing.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

/**
 * Lazy loaded feature module for all auth-related components and dependencies.
 */
@NgModule({
    declarations: [
        featureComponents
    ],
    imports: [
        FeatureRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule
    ]
})
export class FeatureModule { }
