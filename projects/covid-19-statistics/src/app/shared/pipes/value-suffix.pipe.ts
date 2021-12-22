import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSuff',
  pure: true,
})
export class ThousandSuffixesPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let exp: number;
    const suffixes: string[] = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(value) || !value) {
      return null;
    }

    if (value < 100_000) {
      return value;
    }

    exp = Math.floor(Math.log(value) / Math.log(1000));

    return (
      (value / Math.pow(1000, exp)).toFixed(args + 1).slice(0, args * -1) +
      suffixes[exp - 1]
    );
  }
}
