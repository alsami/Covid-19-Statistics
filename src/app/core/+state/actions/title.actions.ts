import { Action } from '@ngrx/store';

export enum TitleActionTypes {
    SetTitle = '[Title] Set Title'
}

export class SetTitle implements Action {
    readonly type = TitleActionTypes.SetTitle;
    public constructor(public section: string, public suffix: string = '', public delimiter = '|') { }
}

export type TitleActions = SetTitle;
