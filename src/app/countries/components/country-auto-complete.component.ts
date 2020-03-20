import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { CountryStats } from '@covid19/countries/models';
import { Observable, Subscription } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'covid19-country-autocomplete',
  templateUrl: './country-auto-complete.component.html',
  styleUrls: ['./country-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryAutoCompleteComponent
  implements OnChanges, AfterViewInit, OnDestroy {
  @Input() countryStats: CountryStats[] = [];
  @Output() countriesSelected = new EventEmitter<string[]>(true);
  filteredCountries: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  countriesCtrl = new FormControl();
  selectedCountries: string[] = [];
  allCountries: string[] = [];
  countryStatsSub: Subscription;
  countriesOfInterest$: Observable<string[]>;
  valueChangesSub: Subscription;

  @ViewChild('countryInput', { static: false }) countryInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  public ngOnChanges(): void {
    if (!this.countryStats || !this.countryStats.length) return;

    this.allCountries = this.countryStats
      .filter(
        stats =>
          stats.country !== null && stats.country !== undefined && stats.country
      )
      .map(country => country.country);

    if (this.selectedCountries.length) {
      return;
    }

    this.countriesSelected.emit(this.allCountries);
  }

  public ngAfterViewInit(): void {
    this.subscribeFormControlChanges();
  }

  public ngOnDestroy(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedCountries.push(value.trim());
      this.countriesSelected.emit(this.selectedCountries);
    }

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
    this.countriesSelected.emit(this.selectedCountries);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCountries.push(event.option.viewValue);
    this.countriesSelected.emit(this.selectedCountries);
    this.countryInput.nativeElement.value = '';
    this.countriesCtrl.setValue(null);
  }

  private subscribeFormControlChanges(): void {
    this.valueChangesSub = this.countriesCtrl.valueChanges
      .pipe(
        startWith(null),
        delay(50),
        map((filter: string | null) =>
          filter && filter.length
            ? this.filterCountries(filter)
            : this.allCountries.slice()
        )
      )
      .subscribe(countries => (this.filteredCountries = countries));
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries.filter(
      country => country && country.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
