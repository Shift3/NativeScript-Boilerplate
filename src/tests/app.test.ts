import { AppComponent } from '../app/app.component';

describe(
    'App Component',
    () => {
        it(
            'appComponent Is Not Null.',
            () => {
                const appComponent = new AppComponent();

                expect(appComponent.toString()).equal('AppComponent');
            }
        );
    }
);
