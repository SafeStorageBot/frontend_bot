import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatLegacyListOption as MatListOption } from "@angular/material/legacy-list";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { Router } from "@angular/router";
import { DecryptedPasswordItem, ResultState } from "src/app/interfaces/item";

@Component({
    selector: 'result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
    items: Array<DecryptedPasswordItem> = [];
    constructor(private router: Router, private _snackBar: MatSnackBar) {
        const navigation = this.router.getCurrentNavigation();
        if (!navigation) { return }
        const state = navigation.extras.state as ResultState;
        if (!state) { return }
        this.items = state.items
    }

    select(value: DecryptedPasswordItem) {
        if (value.error) {return}
        navigator.clipboard.writeText(value.password!).then(() => {
            this._snackBar.open("Copied!", "Ok", {
                duration: 500,
                verticalPosition: "top",
            })
        }, (err) => {
            this._snackBar.open("Error during copy:" + err, "Ok", {
                duration: 500,
                verticalPosition: "top",
            })
        });
    }

    goHome() {
        this.router.navigateByUrl("/")
    }
}