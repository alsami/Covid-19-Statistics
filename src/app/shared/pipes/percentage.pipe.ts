import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'percentage',
  pure: true
})
export class PercentagePipe implements PipeTransform {
  public transform(upper: number, lower: number): number {
    return (lower / upper) * 100;
  }
}
