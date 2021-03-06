import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as titleActions from '@covid19-statistics/core/+state/actions/title.actions';
import { TitleActionTypes } from '@covid19-statistics/core/+state/actions/title.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TitleEffects {
  @Effect({
    dispatch: false,
  })
  tabTitle$: Observable<Action> = this.actions$.pipe(
    ofType(TitleActionTypes.SetTitle),
    tap((action: titleActions.SetTitle) => {
      const newTitle = action.suffix
        ? `COVID-19 | ${action.section} | ${action.suffix}`
        : `COVID-19 | ${action.section}`;

      this.title.setTitle(newTitle);
    })
  );

  public constructor(private actions$: Actions, private title: Title) {}
}
