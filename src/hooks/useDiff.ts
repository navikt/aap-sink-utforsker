import { useReducer } from 'react';

import { ResultatType } from '../../pages/sok';

export enum DiffActions {
  ADD_RIGHT = 'ADD_RIGHT',
  ADD_LEFT = 'ADD_LEFT',
  REMOVE_RIGHT = 'REMOVE_RIGHT',
  REMOVE_LEFT = 'REMOVE_LEFT',
  CLEAR_ALL = 'CLEAR_ALL',
}

export interface ActionType {
  type: DiffActions;
  payload?: ResultatType;
}

function reducer(state: DiffState, action: ActionType) {
  switch (action.type) {
    case DiffActions.ADD_LEFT: {
      return {
        ...state,
        leftSide: action.payload,
      };
    }
    case DiffActions.ADD_RIGHT: {
      return {
        ...state,
        rightSide: action.payload,
      };
    }
    case DiffActions.REMOVE_LEFT: {
      return {
        ...state,
        leftSide: undefined,
      };
    }
    case DiffActions.REMOVE_RIGHT: {
      return {
        ...state,
        rightSide: undefined,
      };
    }
    case DiffActions.CLEAR_ALL: {
      return {
        ...state,
        leftSide: undefined,
        rightSide: undefined,
      };
    }
    default:
      console.warn('Unknown action:' + action.type);
      return state;
  }
}

export interface DiffState {
  leftSide?: ResultatType;
  rightSide?: ResultatType;
}

function useDiff() {
  const [diffState, dispatch] = useReducer(reducer, {});
  return { diffState, dispatch };
}

export { useDiff };
