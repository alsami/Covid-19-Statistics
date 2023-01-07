import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import * as fromRoot from '@covid19-statistics/+state';
import {
  CountriesOfInterestActions,
  LayoutActions,
} from '@covid19-statistics/core/+state/actions';
import { CountryOfInterest } from '@covid19-statistics/countries/models';
import { InterfacePreferencesOverviewComponent } from '@covid19-statistics/interface-preferences/containers';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'covid19-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  mode = 'side';
  layoutGap = '64';
  fixedInViewport = true;
  showStartSidenav = false;
  showEndSidenav = false;

  private bpoSub: Subscription;
  private showStartSidenavSub: Subscription;
  private showEndSidenavSub: Subscription;

  public title$: Observable<string>;
  public countriesOfInterest$: Observable<CountryOfInterest[]>;

  public constructor(
    private bpo: BreakpointObserver,
    private dialog: MatDialog,
    private store: Store<fromRoot.AppState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(LayoutActions.restoreLoaderType());
    this.store.dispatch(CountriesOfInterestActions.load());
  }

  public ngAfterViewInit(): void {
    const breakpoints = Object.keys(Breakpoints).map((key) => Breakpoints[key]);

    this.bpoSub = this.bpo
      .observe(breakpoints)
      .pipe(
        delay(0),
        distinctUntilChanged(),
        map((bst) => bst.matches)
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

    this.showStartSidenavSub = this.store
      .pipe(delay(0), select(fromRoot.getShowStartSidenav))
      .subscribe((show) => (this.showStartSidenav = show));

    this.showEndSidenavSub = this.store
      .pipe(delay(0), select(fromRoot.getShowEndSidenav))
      .subscribe((show) => (this.showEndSidenav = show));
  }

  public ngOnDestroy(): void {
    if (this.bpoSub) {
      this.bpoSub.unsubscribe();
    }

    if (this.showStartSidenavSub) {
      this.showStartSidenavSub.unsubscribe();
    }

    if (this.showEndSidenavSub) {
      this.showEndSidenavSub.unsubscribe();
    }
  }

  public openInterfacePreferenceDialog(): void {
    this.dialog.open(InterfacePreferencesOverviewComponent, {
      hasBackdrop: true,
      closeOnNavigation: true,
      autoFocus: false,
    });
  }

  public saveCountriesOfInterest(
    countriesOfInterest: CountryOfInterest[]
  ): void {
    this.store.dispatch(
      CountriesOfInterestActions.replace({
        countriesOfInterest: countriesOfInterest,
      })
    );
  }

  public hideSidenavs(): void {
    this.store.dispatch(
      LayoutActions.toggleStartSidenav({
        show: false,
      })
    );

    this.store.dispatch(
      LayoutActions.toggleEndSidenav({
        show: false,
      })
    );
  }

  public toggleStartSidenav(): void {
    this.store.dispatch(
      LayoutActions.toggleStartSidenav({
        show: this.showStartSidenav ? false : true,
      })
    );
  }

  public toggleEndSidenav(): void {
    this.store.dispatch(
      LayoutActions.toggleEndSidenav({
        show: this.showEndSidenav ? false : true,
      })
    );
  }

  public toggleSidenavBasedOnSize(): void {
    if (!this.limitedDeviceSize()) {
      return;
    }

    this.store.dispatch(
      LayoutActions.toggleStartSidenav({
        show: false,
      })
    );

    this.store.dispatch(
      LayoutActions.toggleEndSidenav({
        show: false,
      })
    );
  }

  private determineSidenavMode(): void {
    if (this.limitedDeviceSize()) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.store.dispatch(
        LayoutActions.toggleStartSidenav({
          show: false,
        })
      );

      this.store.dispatch(
        LayoutActions.toggleEndSidenav({
          show: false,
        })
      );
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
  }

  private determineLayoutGap(): void {
    if (this.limitedDeviceSize()) {
      this.layoutGap = '56';
      return;
    }

    this.layoutGap = '64';
  }

  private limitedDeviceSize(): boolean {
    return this.extraSmallDevice() || this.smallDevice();
  }

  private extraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  private smallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small);
  }
}
