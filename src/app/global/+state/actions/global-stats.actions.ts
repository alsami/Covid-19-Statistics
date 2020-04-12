import { GlobalStats } from '@covid19/global/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Latest stats] Load');
export const loaded = createAction(
  '[Latest stats] Loaded',
  props<{ latestStats: GlobalStats }>()
);
export const loadFailed = createAction('[Latest stats] Load failed');
