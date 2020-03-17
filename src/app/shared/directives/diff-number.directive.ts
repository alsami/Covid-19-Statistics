import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

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

    const increaseColor = this.positiveChange ? 'green' : 'red';

    const decreaseColor = this.positiveChange ? 'red' : 'green';

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
