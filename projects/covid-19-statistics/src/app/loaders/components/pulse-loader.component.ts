import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'covid19-pulse-loader',
  templateUrl: './pulse-loader.component.html',
  styleUrls: ['./pulse-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PulseLoaderComponent {}
