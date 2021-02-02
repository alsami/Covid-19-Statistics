import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryStatisticsVaryContainer } from '@covid19-country-statistics-lib/lib/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CountryStatisticsVaryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public loadForCountry(
    country: string
  ): Observable<CountryStatisticsVaryContainer[]> {
    return this.http.get<CountryStatisticsVaryContainer[]>(
      `${this.baseUrl}countries/${country}/history/vary`
    );
  }

  public loadForCountries(): Observable<CountryStatisticsVaryContainer[]> {
    return this.http.get<CountryStatisticsVaryContainer[]>(
      `${this.baseUrl}countries/history/vary`
    );
  }
}
