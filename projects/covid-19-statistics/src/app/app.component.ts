import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@covid19-statistics/+state';
import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { LayoutThemeType } from '@covid19-statistics/core/models';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'covid19-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private themeSub: Subscription;

  public theme = LayoutThemeType.GreyLight;

  public constructor(
    private store: Store<fromRoot.AppState>,
    private overlayContainer: OverlayContainer
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(LayoutActions.restoreTheme());
    this.subscribeThemeChanges();
  }

  public ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }

  private subscribeThemeChanges(): void {
    this.themeSub = this.store
      .pipe(select(fromRoot.getTheme))
      .subscribe((theme) => {
        if (theme !== this.theme) {
          this.overlayContainer
            .getContainerElement()
            .classList.remove(this.theme);
          this.theme = theme;
        }
        this.overlayContainer.getContainerElement().classList.add(theme);
      });
  }
}
