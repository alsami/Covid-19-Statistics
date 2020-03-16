import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid19-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mode = 'side';
  opened = true;
  layoutGap = '64';
  fixedInViewport = true;

  public constructor(private bpo: BreakpointObserver) {}

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

  public toggleSidenav(): void {
    this.opened = !this.opened;
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
