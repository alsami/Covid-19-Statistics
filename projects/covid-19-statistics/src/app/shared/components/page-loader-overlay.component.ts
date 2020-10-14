import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
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
import * as fromRoot from '@covid19-statistics/+state';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-page-loader-overlay',
  templateUrl: './page-loader-overlay.component.html',
  styleUrls: ['./page-loader-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoaderOverlayComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input()
  loading: boolean;

  @ViewChild('spinnerContainerOverlay', { static: true })
  templateRef: TemplateRef<any>;

  public loaderType$: Observable<LoaderType>;

  public loaderTypes = LoaderType;

  private overlayRef: OverlayRef;

  public constructor(
    private overlay: Overlay,
    private overlayBuilder: OverlayPositionBuilder,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private store: Store<fromRoot.AppState>
  ) {
    this.overlayRef = this.buildOverLayRef();
    this.cdr.detach();
  }

  public ngOnInit(): void {
    this.loaderType$ = this.store.pipe(select(fromRoot.getLoaderType));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.loading) {
      this.safeAttach();
    }

    if (changes.loading.previousValue && !changes.loading.currentValue) {
      this.safeDetach();
    }

    this.cdr.detectChanges();
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
      backdropClass: 'dark-backdrop',
    });
  }

  private safeAttach(): void {
    if (!this.overlayRef) {
      return;
    }

    if (this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.attach(
      new TemplatePortal(this.templateRef, this.viewContainerRef)
    );
  }

  private safeDetach(): void {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.detach();
  }
}
