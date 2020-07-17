import { LoginComponent } from '@features/auth/login/login.component';

describe(
    'Login suite',
    () => {
        let loginComponent: LoginComponent;

        beforeEach(() => {
            loginComponent = new LoginComponent();
        });

        it(
            'Before login.',
            () => {
                expect(loginComponent.isLogged).equal(false);
            }
        );

        it(
            'After Login account',
            () => {
                loginComponent.login(
                    'belyyan@shift3tech.com',
                    'mypassword'
                );
                expect(loginComponent.isLogged).equal(true);
            }
        );
    }
);
