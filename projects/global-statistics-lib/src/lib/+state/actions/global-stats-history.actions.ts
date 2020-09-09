import { GlobalStatistics } from '@covid19-global-statistics-lib/lib/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Global-Statistics History] Load');
export const loaded = createAction(
  '[Global-Statistics History] Loaded',
  props<{ globalStats: GlobalStatistics[] }>()
);
export const loadFailed = createAction(
  '[Global-Statistics History] Load failed'
);
