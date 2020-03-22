import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@covid19/+state';
import {
  countriesOfInterestActions,
  layoutActions
} from '@covid19/core/+state/actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'covid19-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  mode = 'side';
  layoutGap = '64';
  fixedInViewport = true;
  showSidenav = false;

  title$: Observable<string>;
  countriesOfInterest$: Observable<string[]>;

  private bpoSub: Subscription;
  private showSidenabSub: Subscription;

  public constructor(
    private bpo: BreakpointObserver,
    private store: Store<fromRoot.AppState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(countriesOfInterestActions.load());
  }

  public ngAfterViewInit(): void {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);

    this.bpoSub = this.bpo
      .observe(breakpoints)
      .pipe(
        delay(0),
        map(bst => bst.matches)
      )
      .subscribe(() => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });

    this.countriesOfInterest$ = this.store.pipe(
      delay(0),
      select(fromRoot.getCountriesOfInterest)
    );

    this.title$ = this.store.pipe(delay(0), select(fromRoot.getTitle));

    this.showSidenabSub = this.store
      .pipe(delay(0), select(fromRoot.getShowSidenav))
      .subscribe(show => (this.showSidenav = show));
  }

  public ngOnDestroy(): void {
    if (this.bpoSub) {
      this.bpoSub.unsubscribe();
    }

    if (this.showSidenabSub) {
      this.showSidenabSub.unsubscribe();
    }
  }

  public toggleSidenav(): void {
    this.store.dispatch(
      layoutActions.toggleSidenav({
        show: this.showSidenav ? false : true
      })
    );
  }

  public toggleSidenavBasedOnSize(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.store.dispatch(
        layoutActions.toggleSidenav({
          show: false
        })
      );
    }
  }

  private determineSidenavMode(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.store.dispatch(
        layoutActions.toggleSidenav({
          show: false
        })
      );
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '56';
      return;
    }

    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }
}
