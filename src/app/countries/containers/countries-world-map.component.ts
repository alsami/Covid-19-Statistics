import { Component, OnInit } from '@angular/core';
import { TitleActions } from '@covid19/core/+state/actions';
import { countriesStatsActions } from '@covid19/countries/+state/actions';
import * as fromCountries from '@covid19/countries/+state/reducer';
import { CountryStats } from '@covid19/countries/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-countries-world-map',
  templateUrl: './countries-world-map.component.html',
  styleUrls: ['./countries-world-map.component.scss'],
})
export class CountriesWorldMapComponent implements OnInit {
  public countryStats$: Observable<CountryStats[]>;
  public loading$: Observable<boolean>;

  public constructor(private store: Store<fromCountries.CountryState>) {}

  public ngOnInit(): void {
    this.countryStats$ = this.store.pipe(
      select(fromCountries.getCountriesStats)
    );

    this.loading$ = this.store.pipe(
      select(fromCountries.getCountriesStatsLoading)
    );

    this.store.dispatch(new TitleActions.SetTitle('World Map'));
    this.store.dispatch(countriesStatsActions.load());
  }
}
