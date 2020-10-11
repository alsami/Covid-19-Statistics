import { Injectable } from '@angular/core';
import { CountryOfInterest } from '@covid19-statistics/countries/models';

const COUNTRIES_OF_INTEREST_KEY = 'COUNTRIES_OF_INTEREST';
const COUNTRIES_OF_INTEREST_COUNTRY_CODE_MIGRATE_KEY =
  'COUNTRIES_OF_INTEREST_COUNTRY_CODE_MIGRATED';

const storage = window.localStorage;

@Injectable({
  providedIn: 'root',
})
export class CountriesOfInterestStorageService {
  public store(country: CountryOfInterest): void {
    const countriesOfInterest = this.load();

    if (
      countriesOfInterest.findIndex(
        (existingCountry) => existingCountry.country === country.country
      ) > -1
    ) {
      return;
    }

    const clone = countriesOfInterest.slice();

    clone.push(country);

    this.override(clone);
  }

  public remove(country: string): void {
    const countriesOfInterest = this.load();

    const clone = countriesOfInterest.slice();

    const index = countriesOfInterest.findIndex(
      (existingCountry) => existingCountry.country === country
    );

    if (index === -1) {
      console.log('HERE', country);
      return;
    }

    clone.splice(index, 1);

    this.override(clone);
  }

  public load(): CountryOfInterest[] {
    const migratedValue = storage.getItem(
      COUNTRIES_OF_INTEREST_COUNTRY_CODE_MIGRATE_KEY
    );

    if (!migratedValue) {
      storage.removeItem(COUNTRIES_OF_INTEREST_KEY);
      storage.setItem(
        COUNTRIES_OF_INTEREST_COUNTRY_CODE_MIGRATE_KEY,
        JSON.stringify(new Date())
      );
      return [];
    }

    const storageValue = storage.getItem(COUNTRIES_OF_INTEREST_KEY);

    if (
      !storageValue ||
      storageValue === '' ||
      storageValue === undefined ||
      storageValue === null
    ) {
      return [];
    }

    const countries = JSON.parse(storageValue) as CountryOfInterest[];

    return countries;
  }

  public override(countries: CountryOfInterest[]): void {
    storage.setItem(COUNTRIES_OF_INTEREST_KEY, JSON.stringify(countries));
  }
}
