export interface CountryStats {
  country: string;
  totalCases: number;
  newCases: number;
  totalDeaths: number;
  newDeaths: number;
  activeCases: number;
  recoveredCases: number;
  seriousCases: number;
  fetchedAt: string;
}