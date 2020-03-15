import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { LatestStats } from '@covid19/stats/models';

@Component({
  selector: 'covid19-latest-stats-card',
  templateUrl: './latest-stats-card.component.html',
  styleUrls: ['./latest-stats-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestStatsCardComponent implements OnInit {
  @Input() latestStats: LatestStats;

  @Output() refresh = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
