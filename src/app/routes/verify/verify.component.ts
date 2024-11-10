import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { Router } from "@angular/router";
import { combineLatest, map, Subject, switchMap, takeUntil } from "rxjs";
import { BotHttpResponse } from "src/app/interfaces/http";
import { DecryptedPasswordItem, PasswordItem, ResultState, VerifyState, VerifyStates } from "src/app/interfaces/item";
import { ListService } from "src/app/services/list.service";
import { VerifyService } from "src/app/services/verify.service";

@Component({
    selector: 'verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent implements OnDestroy {
    form = this.fb.group({
        key: ['', Validators.minLength(4)],
    })
    edit = true
    hide = true;
    forDecrypt?: Array<PasswordItem> = [];
    forEncrypt?: Array<DecryptedPasswordItem> = [];
    state: VerifyStates = VerifyStates.Decrypt

    destroyed$ = new Subject<void>();

    constructor(private router: Router, private fb: UntypedFormBuilder, private verifyService: VerifyService, private listService: ListService, private _snackBar: MatSnackBar) {
        const navigation = this.router.getCurrentNavigation();
        if (!navigation) { return }
        const state = navigation.extras.state as VerifyState;
        if (!state){return}
        this.state = state.state
        if (this.state == VerifyStates.Decrypt) {
            this.forDecrypt = state.forDecrypt
        } else {
            this.forEncrypt = state.forEncrypt
        }
    }

    verify() {
        if (!this.form.valid) {
            return
        }
        const passkeys = this.form.get('key')?.value || "";
        if (!passkeys) {
            return
        }

        if (this.state == VerifyStates.Decrypt) {
            this.decrypt(passkeys)
            return
        }
        this.encrypt(passkeys)
    }

    decrypt(passkeys: string) {
        this.verifyService.decrypt(this.forDecrypt || [], passkeys).pipe(
            takeUntil(this.destroyed$),
        ).subscribe((decryptedItems: Array<DecryptedPasswordItem>) => {
            this.router.navigateByUrl("/result", {
                state: {
                    items: decryptedItems,
                } as ResultState
            })
        })
    }

    goHome() {
        this.router.navigateByUrl("/")
    }

    encrypt(passkeys: string) {
        this.edit = false
        this.verifyService.encrypt(this.forEncrypt || [], passkeys).pipe(
            switchMap((items: Array<PasswordItem>) => combineLatest(...items.map((i) => this.listService.add(i)))),
            takeUntil(this.destroyed$),
        ).subscribe((resp: Array<BotHttpResponse<any>>) => {
            this.edit = true
            if (resp.find((item) => item.error)) {
                this._snackBar.open("Error during add ecrypted password on server", "Ok", {
                    duration: 1500,
                    verticalPosition: "top",
                })
                return
            }
            this.router.navigateByUrl("/")
        })
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }
}