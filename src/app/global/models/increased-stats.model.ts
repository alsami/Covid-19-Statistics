import { IncreaseType } from '@covid19/global/models/increase-type.model';

export interface IncreasedStats {
  type: IncreaseType;
  text: string;
  increase: number;
  time: string;
}
