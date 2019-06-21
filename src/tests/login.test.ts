import { LoginComponent } from "../app/login/login.component";

describe('Login suite', function () {
	var loginComponent;

	beforeEach(function(){
		loginComponent = new LoginComponent();
	});

	it("Before login.", function() {
		expect(loginComponent.isLogged).equal(true);
	});

	it("After Login account", function() {
		loginComponent.login("belyyan@shift3tech.com", "mypassword");
		expect(loginComponent.isLogged).equal(true);
	})
});