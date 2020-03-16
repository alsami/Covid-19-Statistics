import { ActiveCaseStats } from '@covid19/cases/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Active cases stats history] Load');
export const loaded = createAction(
  '[Active cases stats history] Loaded',
  props<{ activeCaseStats: ActiveCaseStats[] }>()
);
export const loadFailed = createAction(
  '[Active cases stats history] Load failed'
);
