import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import * as titleActions from '@covid19/core/+state/actions/title.actions';
import { TitleActionTypes } from '@covid19/core/+state/actions/title.actions';

@Injectable()
export class TitleEffects {
    @Effect({
        dispatch: false
    }) tabTitle$: Observable<Action> = this.actions$.pipe(
        ofType(TitleActionTypes.SetTitle),
        tap(
            (action: titleActions.SetTitle) => {
                const newTitle = action.suffix
                    ? `Covid19 | ${action.section} | ${action.suffix}`
                    : `Covid19 | ${action.section}`;

                this.title.setTitle(newTitle);
            }
        )
    );

    public constructor(private actions$: Actions, private title: Title) { }
}
