import { Component, OnInit } from '@angular/core';
import * as fromRoot from '@covid19-statistics/+state';
import { LayoutActions } from '@covid19-statistics/core/+state/actions';
import { LayoutThemeType } from '@covid19-statistics/core/models';
import { LoaderType } from '@covid19-statistics/loaders/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'covid19-interface-preferences-overview',
  templateUrl: './interface-preferences-overview.component.html',
  styleUrls: ['./interface-preferences-overview.component.scss'],
})
export class InterfacePreferencesOverviewComponent implements OnInit {
  public loaderType$: Observable<LoaderType>;
  public themeType: Observable<LayoutThemeType>;
  public selectedIndex = 0;

  public constructor(private store: Store<fromRoot.AppState>) {}

  public ngOnInit(): void {
    this.loaderType$ = this.store.pipe(select(fromRoot.getLoaderType));
    this.themeType = this.store.pipe(select(fromRoot.getTheme));
  }

  public saveLoaderType(loaderType: LoaderType): void {
    console.log(loaderType);
    this.store.dispatch(
      LayoutActions.setLoaderType({
        loaderType,
      })
    );
  }

  public changeTheme(layoutThemeType: LayoutThemeType): void {
    this.store.dispatch(
      LayoutActions.setTheme({
        theme: layoutThemeType,
      })
    );
  }
}
