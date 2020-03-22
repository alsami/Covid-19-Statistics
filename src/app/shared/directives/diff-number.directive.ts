import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { PROPER_GREEN, PROPER_RED } from '@covid19/core/core.constants';

@Directive({
  selector: '[covid19DiffNumberColor]'
})
export class DiffNumberColorDirective implements AfterViewInit {
  public constructor(private elementRef: ElementRef) {}

  @Input('covid19DiffNumberColor') positiveChange = false;

  public ngAfterViewInit(): void {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    const value = +htmlElement.innerHTML;

    if (value === 0) {
      return;
    }

    const increaseColor = this.positiveChange ? PROPER_GREEN : PROPER_RED;

    const decreaseColor = this.positiveChange ? PROPER_RED : PROPER_GREEN;

    if (value > 0) {
      htmlElement.style.color = increaseColor;
      htmlElement.innerHTML = `+${value}`;
      return;
    }

    if (value < 0) {
      htmlElement.style.color = decreaseColor;
      htmlElement.innerHTML = `${value}`;
      return;
    }
  }
}
