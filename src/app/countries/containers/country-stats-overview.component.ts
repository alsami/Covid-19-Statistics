import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { TitleActions } from '@covid19/core/+state/actions';
import { countryStatsActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'covid19-country-stats-overview',
  templateUrl: './country-stats-overview.component.html',
  styleUrls: ['./country-stats-overview.component.scss']
})
export class CountryStatsOverviewComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public countryStats$: Observable<CountryStats[]>;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  countriesCtrl = new FormControl();
  filteredCountries$: Observable<string[]>;
  selectedCountries$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  allCountries: string[] = [];
  filteredCountryStats$: Observable<CountryStats[]>;
  countryStatsSub: Subscription;

  @ViewChild('countryInput', { static: false }) countryInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  public constructor(private store: Store<fromCountries.CountryState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new TitleActions.SetTitle('Countries'));
    this.store.dispatch(countryStatsActions.load());

    this.loading$ = this.store.pipe(
      select(fromCountries.getCountryStatsLoading)
    );
    this.countryStats$ = this.store.pipe(select(fromCountries.getCountryStats));

    this.subscribeFormControlChanges();
    this.subscribeCountryStatsChanges();
    this.subscribeFilterCountryStatsChanges();
  }

  public ngOnDestroy(): void {
    if (this.countryStatsSub) {
      this.countryStatsSub.unsubscribe();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const current = this.selectedCountries$.getValue();
      current.push(value.trim());
      this.selectedCountries$.next(current);
    }

    if (input) {
      input.value = '';
    }

    this.countriesCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const current = this.selectedCountries$.getValue();
    const index = current.indexOf(fruit);

    if (index >= 0) {
      current.splice(index, 1);
      this.selectedCountries$.next(current);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const current = this.selectedCountries$.getValue();
    current.push(event.option.viewValue);
    this.selectedCountries$.next(current);
    this.countryInput.nativeElement.value = '';
    this.countriesCtrl.setValue(null);
  }

  private subscribeFilterCountryStatsChanges(): void {
    this.filteredCountryStats$ = combineLatest(
      this.selectedCountries$,
      this.countryStats$
    ).pipe(
      map(([a, b]) => {
        if (!a || !a.length) {
          return b;
        }

        return b.filter(s => a.indexOf(s.country) > -1);
      })
    );
  }

  private subscribeCountryStatsChanges(): void {
    this.countryStatsSub = this.countryStats$
      .pipe(
        map(stats =>
          stats
            .filter(stat => stat.country && stat.country.length)
            .map(stat => stat.country)
        )
      )
      .subscribe(countries => {
        this.allCountries = countries;
      });
  }

  private subscribeFormControlChanges(): void {
    this.filteredCountries$ = this.countriesCtrl.valueChanges.pipe(
      startWith(null),
      map((filter: string | null) =>
        filter && filter.length
          ? this.filterCountries(filter)
          : this.allCountries.slice()
      )
    );
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries.filter(
      country => country && country.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
