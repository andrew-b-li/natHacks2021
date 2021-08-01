export const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_DATA_REQUEST':
      return { loading: true };
    case 'USER_DATA_SUCCESS':
      return {
        loading: false,
        isAuthenticated: true,
        userData: action.payload,
      };
    case 'USER_DATA_FAIL':
      return { loading: false, isAuthenticated: false, userData: null };
    case 'RESET_AUTH':
      return { loading: false, isAuthenticated: false, userData: null };
    case 'REQUEST_LOGOUT':
      return {
        loading: true,
        isAuthenticated: false,
        userData: null,
        awaitingLogout: true,
      };
    case 'LOGOUT_COMPLETE':
      return { ...state, loading: false, awaitingLogout: false };
    default:
      return state;
  }
};
