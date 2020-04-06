import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GlobalStats } from '@covid19/stats/models';

@Component({
  selector: 'covid19-global-stats-card',
  templateUrl: './global-stats-card.component.html',
  styleUrls: ['./global-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStatsCardComponent {
  @Input() globalStats: GlobalStats;

  @Output() refresh = new EventEmitter();
}
