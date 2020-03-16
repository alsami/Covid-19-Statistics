import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ActiveCaseStats } from '@covid19/cases/models';

@Component({
  selector: 'covid19-active-cases-stats-card',
  templateUrl: './active-cases-stats-card.component.html',
  styleUrls: ['./active-cases-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCasesStatsCardComponent implements OnInit {
  @Input() activeCasesStats: ActiveCaseStats;

  @Output() refresh = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
