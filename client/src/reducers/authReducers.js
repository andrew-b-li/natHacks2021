// import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
// const isEmpty = require("is-empty");
// const initialState = {
//   isAuthenticated: false,
//   user: {},
//   loading: false,
// };
// export default function (state = initialState, action) {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload,
//       };
//     case USER_LOADING:
//       return {
//         ...state,
//         loading: true,
//       };
//     default:
//       return state;
//   }
// }

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
    default:
      return state;
  }
};
