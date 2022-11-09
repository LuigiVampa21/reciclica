import { AppState } from './AppState';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppInitialState: AppState = {
  loading: {
    show: false
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
    user: null
  }
};
