import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'covid19-rectangle-loader',
  templateUrl: './rectangle-loader.component.html',
  styleUrls: ['./rectangle-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RectangleLoaderComponent {}
