import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { GlobalStats as activeCasesStats } from '@covid19/stats/models';

@Component({
  selector: 'covid19-active-cases-stats-card',
  templateUrl: './active-cases-stats-card.component.html',
  styleUrls: ['./active-cases-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCasesStatsCardComponent implements OnInit {
  @Input() activeCasesStats: activeCasesStats;

  @Output() refresh = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
