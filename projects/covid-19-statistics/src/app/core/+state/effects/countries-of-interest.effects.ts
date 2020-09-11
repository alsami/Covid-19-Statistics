import { Injectable } from '@angular/core';
import { countriesOfInterestActions } from '@covid19-statistics/core/+state/actions';
import { CountriesOfInterestStorageService } from '@covid19-statistics/core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class CountriesOfInterestEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesOfInterestActions.load),
      map(() =>
        countriesOfInterestActions.loaded({
          countriesOfInterest: this.storage.load(),
        })
      )
    )
  );

  store$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesOfInterestActions.add),
      map((action) => {
        this.storage.store(action.countryOfInterest);
        return countriesOfInterestActions.loaded({
          countriesOfInterest: this.storage.load(),
        });
      })
    )
  );

  replace$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(countriesOfInterestActions.replace),
        map((action) => {
          this.storage.override(action.countriesOfInterest);
        })
      ),
    {
      dispatch: false,
    }
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countriesOfInterestActions.remove),
      map((action) => {
        this.storage.remove(action.countryOfInterest);
        return countriesOfInterestActions.loaded({
          countriesOfInterest: this.storage.load(),
        });
      })
    )
  );

  public constructor(
    private actions$: Actions,
    private storage: CountriesOfInterestStorageService
  ) {}
}
