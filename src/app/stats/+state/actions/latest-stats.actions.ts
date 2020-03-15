import { createAction, props } from '@ngrx/store';
import { LatestStats } from '@covid19/stats/models';

export const load = createAction('[Latest stats] Load');
export const loaded = createAction(
  '[Latest stats] Loaded',
  props<{ latestStats: LatestStats }>()
);
export const loadFailed = createAction('[Latest stats] Load failed');
