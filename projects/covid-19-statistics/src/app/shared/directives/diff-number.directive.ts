import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Injector,
  Input,
} from '@angular/core';
import {
  PROPER_GREEN,
  PROPER_RED,
} from '@covid19-statistics/core/core.constants';

@Directive({
  selector: '[covid19DiffNumberColor]',
})
export class DiffNumberColorDirective implements AfterViewInit {
  public constructor(
    private elementRef: ElementRef,
    private injector: Injector
  ) {}

  @Input('covid19DiffNumberColor') positiveChange = false;

  public ngAfterViewInit(): void {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    const value = +htmlElement.innerHTML;

    if (value === 0) {
      return;
    }

    const increaseColor = this.positiveChange ? PROPER_GREEN : PROPER_RED;

    const decreaseColor = this.positiveChange ? PROPER_RED : PROPER_GREEN;

    const pipe = this.injector.get(DecimalPipe);

    if (value > 0) {
      htmlElement.style.color = increaseColor;
      htmlElement.innerHTML = `+${pipe.transform(value, '1.0-1')}`;
      return;
    }

    if (value < 0) {
      htmlElement.style.color = decreaseColor;
      htmlElement.innerHTML = `${pipe.transform(value, '1.0-1')}`;
      return;
    }
  }
}
