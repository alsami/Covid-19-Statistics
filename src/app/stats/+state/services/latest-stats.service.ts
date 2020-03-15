import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LatestStats } from '@covid19/stats/models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LatestStatsService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<LatestStats> {
    return this.http.get<LatestStats>(`${this.baseUrl}stats`);
  }
}
