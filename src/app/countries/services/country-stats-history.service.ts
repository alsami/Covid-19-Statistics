import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryStats } from '@covid19/countries/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CountryStatsHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(country: string): Observable<CountryStats[]> {
    return this.http.get<CountryStats[]>(
      `${this.baseUrl}countries/${country}/history`
    );
  }
}
