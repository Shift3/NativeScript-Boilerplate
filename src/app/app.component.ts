import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ns-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    private name = 'AppComponent'
    public toString(): string {
        return this.name;
    }
}
