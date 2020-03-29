import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClosedCaseStats } from '@covid19/cases/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ClosedCasesStatsHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<ClosedCaseStats[]> {
    return this.http.get<ClosedCaseStats[]>(
      `${this.baseUrl}stats/closedcases/history`
    );
  }
}
