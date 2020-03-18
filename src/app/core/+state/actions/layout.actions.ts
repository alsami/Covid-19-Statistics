import { createAction, props } from '@ngrx/store';

export const toggleSidenav = createAction(
  '[Layout] Toggle sidenav',
  props<{ show: boolean }>()
);
