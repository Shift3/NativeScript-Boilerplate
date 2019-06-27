import { AppComponent } from "../app/app.component";
// A sample Mocha test
describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1, 2, 3].indexOf(0));
			assert.equal(-1, [1, 2, 3].indexOf(5));
		});
	});
});

describe('A suite', function () {
	it('true equal to true', function () {
		expect(true).equal(true);
	});
});

describe('App suite', function () {
	var appComponent;

	beforeEach(function(){
		appComponent = new AppComponent();
	});

	it("verify default message.", function() {
		expect(appComponent.message).equal("16 taps left");
	});

	it("decrease tap account", function() {
		appComponent.onTap();
		expect(appComponent.message).equal("15 taps left");
	})
});


