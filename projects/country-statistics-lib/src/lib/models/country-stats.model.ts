export const COUNTRY_CODE_UNAVAILABLE = 'N/A';

export interface CountryStats {
  country: string;
  countryCode: string;
  totalCases: number;
  newCases: number;
  totalDeaths: number;
  newDeaths: number;
  activeCases: number;
  recoveredCases: number;
  fetchedAt: string;
}
