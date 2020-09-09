import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Global-Statistics] Load');
export const loaded = createAction(
  '[Global-Statistics] Loaded',
  props<{ latestStats: GlobalStatistics }>()
);
export const loadFailed = createAction('[Global-Statistics] Load failed');
