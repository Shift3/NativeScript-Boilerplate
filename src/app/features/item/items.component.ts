import { Component } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
    moduleId: module.id,
    providers: [ItemService],
    selector: 'ns-items',
    templateUrl: './items.component.html'
})
export class ItemsComponent {
    public items: Array<Item>;

    /*
     * This pattern makes use of Angular’s dependency injection
     * implementation to inject an instance of the ItemService
     * service into this class.
     * Angular knows about this service because it is included
     * in your app’s main NgModule, defined in app.module.ts.
     */
    constructor(private itemService: ItemService) {
        this.items = this.itemService.getItems();
    }
}
