import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GlobalStatistics } from '@covid19-global-statistics-lib/public-api';

@Component({
  selector: 'covid19-global-stats-card',
  templateUrl: './global-stats-card.component.html',
  styleUrls: ['./global-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStatsCardComponent {
  @Input() globalStats: GlobalStatistics;

  @Output() refresh = new EventEmitter();
}
