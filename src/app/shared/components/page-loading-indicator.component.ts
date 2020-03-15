import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  ViewChild,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {
  OverlayRef,
  Overlay,
  OverlayPositionBuilder
} from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { BreakpointService } from '@covid19/core/services';
import { TemplatePortal } from '@angular/cdk/portal';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'covid19-page-loading-indicator',
  templateUrl: './page-loading-indicator.component.html'
})
export class PageLoadingIndicatorComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  loading: boolean;

  @ViewChild('overlay', { static: false })
  templateRef: TemplateRef<any>;

  private overlayRef: OverlayRef;
  private breakpointSubscription: Subscription;
  private isExtrasmallWindow: boolean;

  public constructor(
    private overlay: Overlay,
    private overlayBuilder: OverlayPositionBuilder,
    private breakpointService: BreakpointService,
    private viewContainerRef: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    this.overlayRef = this.buildOverLayRef(56);
  }

  public ngAfterViewInit(): void {
    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    );

    this.breakpointSubscription = this.breakpointService
      .hasBreakpointChanged(Breakpoints.XSmall)
      .subscribe(isExtraSmall => this.redraw(isExtraSmall));
  }

  public ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();

    this.safeDetach();
  }

  private redraw(isExtraSmall: boolean): void {
    if (this.isExtrasmallWindow === isExtraSmall) {
      return;
    }

    this.isExtrasmallWindow = isExtraSmall;

    this.safeDetach();

    this.overlayRef = this.buildOverLayRef(this.isExtrasmallWindow ? 56 : 64);

    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    );
  }

  private buildOverLayRef(size: 56 | 64): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlayBuilder
        .global()
        .top(`${size}px`)
        .width('100%')
    });
  }

  private safeDetach(): void {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.detach();
  }
}
