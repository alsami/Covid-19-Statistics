import {
  TitleActions,
  TitleActionTypes
} from '@covid19/core/+state/actions/title.actions';

export interface TitleState {
  title: string;
}

const initialState: TitleState = {
  title: null
};

export function reducer(
  state = initialState,
  action: TitleActions
): TitleState {
  switch (action.type) {
    case TitleActionTypes.SetTitle:
      return {
        title: action.suffix
          ? `${action.section} ${action.delimiter} ${action.suffix}`
          : action.section
      };

    default:
      return state;
  }
}

export const title = (state: TitleState) => state.title;
