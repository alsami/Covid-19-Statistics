import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as titleActions from '@covid19-statistics/core/+state/actions/title.actions';
import { TitleActionTypes } from '@covid19-statistics/core/+state/actions/title.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TitleEffects {
  
  tabTitle$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(TitleActionTypes.SetTitle),
    tap((action: titleActions.SetTitle) => {
      const newTitle = action.suffix
        ? `COVID-19 | ${action.section} | ${action.suffix}`
        : `COVID-19 | ${action.section}`;

      this.title.setTitle(newTitle);
    })
  ), {
    dispatch: false,
  });

  public constructor(private actions$: Actions, private title: Title) {}
}
