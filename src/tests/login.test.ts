import { LoginComponent } from '@features/auth/login/login.component';

describe('Login suite', function () {
    let loginComponent: LoginComponent;

    beforeEach(function () {
        loginComponent = new LoginComponent();
    });

    it('Before login.', function () {
        expect(loginComponent.isLogged).equal(false);
    });

    it('After Login account', function () {
        loginComponent.login('belyyan@shift3tech.com', 'mypassword');
        expect(loginComponent.isLogged).equal(true);
    });
});
