import { GlobalStats } from '@covid19/global/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Global stats history] Load');
export const loaded = createAction(
  '[Global stats history] Loaded',
  props<{ globalStats: GlobalStats[] }>()
);
export const loadFailed = createAction('[Global stats history] Load failed');
