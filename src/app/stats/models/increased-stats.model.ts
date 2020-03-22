import { IncreaseType } from '@covid19/stats/models/increase-type.model';

export interface IncreasedStats {
  type: IncreaseType;
  text: string;
  increase: number;
  time: string;
}
