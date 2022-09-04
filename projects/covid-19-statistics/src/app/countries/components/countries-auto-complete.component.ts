import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CountryStats } from '@covid19-country-statistics-lib/public-api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'covid19-countries-autocomplete',
  templateUrl: './countries-auto-complete.component.html',
  styleUrls: ['./countries-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesAutoCompleteComponent
  implements OnChanges, AfterViewInit {
  private readonly elementSize = 48;

  @Input() countryStats: CountryStats[] = [];
  @Output() countriesSelected: BehaviorSubject<string[]> = new BehaviorSubject(
    []
  );
  filteredCountries$: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  countriesCtrl = new UntypedFormControl();
  selectedCountries: string[] = [];
  allCountries: string[] = [];
  countryStatsSub: Subscription;
  countriesOfInterest$: Observable<string[]>;

  @ViewChild('countryInput', { static: false }) countryInput: ElementRef<
    HTMLInputElement
  >;

  public constructor() {
    this.subscribeFormControlChanges();
  }

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) return;

    this.allCountries = this.countryStats
      .filter(
        (stats) =>
          stats.country !== null && stats.country !== undefined && stats.country
      )
      .map((country) => country.country);
  }

  public ngAfterViewInit(): void {}

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (!(value || '').trim()) {
      return;
    }

    const trimmed = value.trim();

    const wanted = this.allCountries.find(
      (country) => country.toLowerCase() === trimmed.toLowerCase()
    );

    if (!wanted) {
      return;
    }

    this.selectedCountries.push(wanted);
    this.countriesSelected.next(this.selectedCountries);

    if (input) {
      input.value = '';
    }

    this.countriesCtrl.setValue(null);
  }

  public remove(country: string): void {
    const index = this.selectedCountries.indexOf(country);

    if (index === -1) {
      return;
    }

    this.selectedCountries.splice(index, 1);
    this.countriesSelected.next(this.selectedCountries);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCountries.push(event.option.viewValue);
    this.countriesSelected.next(this.selectedCountries);
    this.countryInput.nativeElement.value = '';
    this.countriesCtrl.setValue(null);
  }

  public getCountryStatistics(country: string): CountryStats {
    return this.countryStats.find((stats) => stats.country === country);
  }

  public calculateDropDownHeightPx(length: number | null): number {
    return length * this.elementSize >= 190 ? 190 : length * this.elementSize;
  }

  private subscribeFormControlChanges(): void {
    this.filteredCountries$ = this.countriesCtrl.valueChanges.pipe(
      startWith(''),
      map((filter: string | null) =>
        filter?.length
          ? this.filterCountries(filter)
          : this.allCountries.slice()
      )
    );
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries.filter(
      (country) => country && country.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
