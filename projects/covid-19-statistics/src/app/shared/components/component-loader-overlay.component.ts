import { Component, Input, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'covid19-component-loader-overlay',
  templateUrl: './component-loader-overlay.component.html',
  styleUrls: ['./component-loader-overlay.component.scss']
})
export class ComponentLoaderOverlayComponent implements OnChanges {
  private interval;

  public dots$: BehaviorSubject<string> = new BehaviorSubject('');

  @Input() loading = false;

  @Input() message = null;

  public ngOnChanges(): void {
    this.safeClearInterval();
    this.changedDotsIntervaled();
  }

  public changedDotsIntervaled(): void {
    this.interval = setInterval(() => {
      if (this.dots$.getValue().length === 0) {
        this.dots$.next('.');
        return;
      }

      if (this.dots$.getValue().length === 1) {
        this.dots$.next('..');
        return;
      }

      if (this.dots$.getValue().length === 2) {
        this.dots$.next('...');
        return;
      }

      this.dots$.next('');
    }, 500);
  }

  private safeClearInterval(): void {
    if (this.interval === undefined) {
      return;
    }

    clearInterval(this.interval);
  }
}
