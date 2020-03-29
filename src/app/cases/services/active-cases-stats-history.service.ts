import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveCaseStats } from '@covid19/cases/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ActiveCasesStatsHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<ActiveCaseStats[]> {
    return this.http.get<ActiveCaseStats[]>(
      `${this.baseUrl}stats/activecases/history`
    );
  }
}
