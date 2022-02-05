import {Action, createStore} from 'redux';

const userField = 'user';

// User login

export const USER_LOGIN = 'USER_LOGIN';

interface UserLoginAction extends Action<typeof USER_LOGIN> {
  user: string;
}

export function userLoginAction(user: string): UserLoginAction {
  return {type: USER_LOGIN, user};
}

// User logout

export const USER_LOGOUT = 'USER_LOGOUT';

type UserLogoutAction = Action<typeof USER_LOGOUT>;

export const userLogoutAction: UserLogoutAction = {type: USER_LOGOUT};

// Actions

export type StoreAction = UserLoginAction | UserLogoutAction;

// Store state

interface StoreState {
  currentUser?: string;
}


function rootReducer(store: StoreState = {}, action: StoreAction): StoreState {
  switch (action.type) {
    default:
      return store;
  }
}

export const store = createStore(rootReducer);
