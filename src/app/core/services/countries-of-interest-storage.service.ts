import { Injectable } from '@angular/core';

const key = 'COUNTRIES_OF_INTEREST';

@Injectable({
  providedIn: 'root'
})
export class CountriesOfInterestStorageService {
  public store(country: string): void {
    const countriesOfInterest = this.load();

    if (
      countriesOfInterest.findIndex(
        existingCountry => existingCountry === country
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

    clone.splice(
      countriesOfInterest.findIndex(
        existingCountry => existingCountry === country
      )
    );

    this.override(clone);
  }

  public load(): string[] {
    const storageValue = window.localStorage.getItem(key);

    if (
      !storageValue ||
      storageValue === '' ||
      storageValue === undefined ||
      storageValue === null
    ) {
      return [];
    }

    const countries = JSON.parse(storageValue) as string[];

    return countries.sort((a, b) => a.localeCompare(b));
  }

  private override(countries: string[]): void {
    console.log(countries);
    window.localStorage.setItem(key, JSON.stringify(countries));
  }
}
