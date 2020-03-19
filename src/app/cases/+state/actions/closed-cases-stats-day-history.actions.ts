import { ClosedCaseStats } from '@covid19/cases/models';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Closed cases day history] Load');
export const loaded = createAction(
  '[Closed cases day history] Loaded',
  props<{ closedCasesStats: ClosedCaseStats[] }>()
);
export const loadFailed = createAction(
  '[Closed cases day history] Load failed'
);
