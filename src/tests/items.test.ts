import { ItemsComponent } from "../app/item/items.component";
import { ItemService } from "../app/item/item.service";

describe('Items suite', function () {
	var itemsComponent;

	beforeEach(function(){
		itemsComponent = new ItemsComponent(new ItemService());
	});

	it("There are available items.", function() {
		expect(itemsComponent.isItemsAvailable).equal(true);
	});
});