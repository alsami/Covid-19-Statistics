import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ClosedCaseStats } from '@covid19/cases/models';

@Component({
  selector: 'covid19-closed-cases-stats-card',
  templateUrl: './closed-cases-stats-card.component.html',
  styleUrls: ['./closed-cases-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClosedCasesStatsCardComponent {
  @Input() closedCasesStats: ClosedCaseStats;

  @Output() refresh = new EventEmitter();
}
