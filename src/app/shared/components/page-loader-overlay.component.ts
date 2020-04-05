import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'covid19-page-loader-overlay',
  templateUrl: './page-loader-overlay.component.html',
  styleUrls: ['./page-loader-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoaderOverlayComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input()
  loading: boolean;

  @ViewChild('overlay', { static: false })
  templateRef: TemplateRef<any>;

  private overlayRef: OverlayRef;

  public constructor(
    private overlay: Overlay,
    private overlayBuilder: OverlayPositionBuilder,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    this.cdr.detach();
  }

  public ngOnInit(): void {
    this.overlayRef = this.buildOverLayRef();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
    if (changes.loading.previousValue && !changes.loading.currentValue) {
      setTimeout(() => {
        this.safeDetach();
      }, 250);
    }
  }

  public ngAfterViewInit(): void {
    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    );
  }

  public ngOnDestroy(): void {
    this.safeDetach();
  }

  private buildOverLayRef(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlayBuilder
        .global()
        .centerVertically()
        .centerHorizontally(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
    });
  }

  private safeDetach(): void {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.detach();
  }
}
