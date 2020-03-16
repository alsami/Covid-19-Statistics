import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GlobalStats } from '@covid19/stats/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalStatsService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<GlobalStats> {
    return this.http.get<GlobalStats>(`${this.baseUrl}stats`);
  }
}
