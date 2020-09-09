import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { environment } from '@covid19-statistics-environment/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalStatsHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<GlobalStatistics[]> {
    return this.http.get<GlobalStatistics[]>(`${this.baseUrl}global/history`);
  }
}
