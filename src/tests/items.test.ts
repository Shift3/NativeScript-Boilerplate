import { ItemsComponent } from '@features/item/items.component';
import { ItemService } from '@features/item/item.service';

describe(
    'Items suite',
    () => {
        let itemsComponent: ItemsComponent;

        before(() => {
            itemsComponent = new ItemsComponent(new ItemService());
        });

        it(
            'There are available items.',
            () => {
                const itm = itemsComponent.items.length > 0;

                expect(itm).equal(true);
            }
        );
    }
);
