import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from '@features/item/items.component';
import { ItemDetailComponent } from '@features/item/item-detail.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full',
    },
    {
        path: 'items',
        component: ItemsComponent,
        data: { title: 'Items' },
    },
    {
        path: 'item/:id',
        component: ItemDetailComponent,
        data: { title: 'Item Detail' },
    }
];

/**
 * Lazy loaded module for all auth-related routes.
 */
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class FeatureRoutingModule { }

export const featureComponents = [
    ItemsComponent,
    ItemDetailComponent
];
