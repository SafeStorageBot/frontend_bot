import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { VerifyStates, VerifyState } from 'src/app/interfaces/item';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    TranslatePipe,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class AddComponent {
  form = this.fb.group({
    title: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(40)]),
    ],
    password: [
      '',
      Validators.compose([Validators.minLength(4), Validators.maxLength(100)]),
    ],
    icon: [''],
  });
  hide = true;
  constructor(private fb: UntypedFormBuilder, private router: Router) {}

  add() {
    if (!this.form.valid) {
      return;
    }
    this.router.navigateByUrl('/verify', {
      state: {
        forEncrypt: [
          {
            title: this.form.get('title')?.value as string,
            password: this.form.get('password')?.value as string,
          },
        ],
        state: VerifyStates.Encrypt,
      } as VerifyState,
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
