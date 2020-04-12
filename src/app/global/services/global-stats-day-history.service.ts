import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalStats } from '@covid19/global/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalStatsDayHistoryService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public load(): Observable<GlobalStats[]> {
    return this.http.get<GlobalStats[]>(`${this.baseUrl}stats/dayhistory`);
  }
}
