import { ItemsComponent } from '@features/item/items.component';
import { ItemService } from '@features/item/item.service';

describe('Items suite', function () {
    let itemsComponent: ItemsComponent;

    beforeEach(function () {
        itemsComponent = new ItemsComponent(new ItemService());
    });

    it('There are available items.', function () {
        const itm = itemsComponent.items.length > 0;
        expect(itm).equal(true);
    });
});
