import { ClosedCaseStats } from '@covid19/cases/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Closed cases stats stats] Load');
export const loaded = createAction(
  '[Closed cases stats] Loaded',
  props<{ closedCaseStats: ClosedCaseStats }>()
);
export const loadFailed = createAction('[Closed cases stats] Load failed');
