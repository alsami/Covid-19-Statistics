import { createAction, props } from '@ngrx/store';
import { GlobalStats } from '@covid19/stats/models';

export const load = createAction('[Latest stats] Load');
export const loaded = createAction(
  '[Latest stats] Loaded',
  props<{ latestStats: GlobalStats }>()
);
export const loadFailed = createAction('[Latest stats] Load failed');
