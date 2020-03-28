import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueDiff',
  pure: true
})
export class ValueDiffPipe implements PipeTransform {
  public transform(
    array: any[],
    current: number,
    index: number,
    key: string
  ): number {
    if (!array) {
      return;
    }

    if (index === -1 || index === array.length - 1) {
      return;
    }

    const previous = array[index + 1];

    const diff = current - previous[key];

    return diff;
  }
}
