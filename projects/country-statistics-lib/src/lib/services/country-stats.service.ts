import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryStats } from '@covid19-country-statistics-lib/lib/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CountryStatsService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(country: string): Observable<CountryStats> {
    return this.http.get<CountryStats>(`${this.baseUrl}countries/${country}`);
  }
}
