import { GlobalStats } from '@covid19/stats/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Global stats day history] Load');
export const loaded = createAction(
  '[Global stats day history] Loaded',
  props<{ globalStats: GlobalStats[] }>()
);
export const loadFailed = createAction(
  '[Global stats day history] Load failed'
);
