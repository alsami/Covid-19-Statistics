import { IncreaseType } from '@covid19/stats/models/increase-type.model';

export interface IncreasedStats {
  type: IncreaseType;
  increase: number;
  time: string;
}
