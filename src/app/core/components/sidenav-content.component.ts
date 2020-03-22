import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'covid19-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavContentComponent {
  public version = environment.version;

  @Input() countriesOfInterest: string[] = [];

  @Output() linkClicked = new EventEmitter();
}
