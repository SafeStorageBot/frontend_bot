import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { VerifyStates, VerifyState } from "src/app/interfaces/item";

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
    form = this.fb.group({
        title: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
        password: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(100)])],
        icon: [''],
    })
    hide = true;
    constructor(private fb: FormBuilder, private router: Router) {}

    add() {
        if(!this.form.valid){
            return
        }
        this.router.navigateByUrl("/verify", {
            state: {
                forEncrypt: [
                    {
                        title: this.form.get('title')?.value as string,
                        password: this.form.get('password')?.value as string,
                    }
                ],
                state: VerifyStates.Encrypt,
            } as VerifyState
        })
    }

    goHome() {
        this.router.navigateByUrl("/")
    }
}