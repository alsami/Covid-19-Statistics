import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as fromRoot from '@covid19/+state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'covid19-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  mode = 'side';
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;
  title$: Observable<string>;

  public constructor(
    private bpo: BreakpointObserver,
    private store: Store<fromRoot.AppState>
  ) {}

  public ngOnInit(): void {
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key]);
    this.bpo
      .observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(() => {
        this.determineSidenavMode();
        this.determineLayoutGap();
        console.log(
          'fixedInViewPort',
          this.fixedInViewport,
          'opened',
          this.opened,
          'mode',
          this.mode
        );
      });
  }

  public ngAfterViewInit(): void {
    this.title$ = this.store.pipe(delay(0), select(fromRoot.getTitle));
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }

  public toggleSidenavBasedOnSize(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.opened = false;
    }
  }

  private determineSidenavMode(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.opened = false;
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
