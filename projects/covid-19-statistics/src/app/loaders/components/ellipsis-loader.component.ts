import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'covid19-ellipsis-loader',
  templateUrl: './ellipsis-loader.component.html',
  styleUrls: ['./ellipsis-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EllipsisLoaderComponent {}
