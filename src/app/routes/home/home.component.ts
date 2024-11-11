import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatListOption } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  PasswordItem,
  VerifyState,
  VerifyStates,
} from 'src/app/interfaces/item';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatListModule,
    MatProgressSpinnerModule,
    TranslatePipe,
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeComponent implements OnDestroy {
  loading$ = new Subject<boolean>();
  private readonly refresh$ = new BehaviorSubject(null);
  list$ = this.refresh$.pipe(switchMap(() => this.listService.get()));
  userInfo$ = this.refresh$.pipe(switchMap(() => this.listService.info()));

  selected: Array<PasswordItem> = [];
  destroyed$ = new Subject<void>();

  constructor(private listService: ListService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  OnSelectionChange(options: MatListOption[]) {
    this.selected = options.map((i) => i.value);
  }

  add() {
    this.router.navigateByUrl('/add');
  }

  get isEmpty() {
    return Object.keys(this.selected).length == 0;
  }

  show() {
    this.router.navigateByUrl('/verify', {
      state: {
        forDecrypt: this.selected,
        state: VerifyStates.Decrypt,
      } as VerifyState,
    });
  }

  remove() {
    combineLatest(...this.selected.map((item) => this.listService.remove(item)))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.selected = [];
        this.refresh$.next(null);
      });
  }
}
