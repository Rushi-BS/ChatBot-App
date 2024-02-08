import { UserStateType, UserActionType, UserType } from "../utils/type";

const initializeUserStateFromLocalStorage = (): UserStateType => {
    const storedUserState = localStorage.getItem('userState');
    return storedUserState ? JSON.parse(storedUserState) : { 
            isAuthenticated: false,
            user: null,
    };
};

export const userInitialState: UserStateType = initializeUserStateFromLocalStorage();

const userReducer = (state: UserStateType, action: UserActionType): UserStateType => {
    let newState;
    switch (action.type) {
      case "LOGIN":
        newState = { isAuthenticated: true , user: action.payload as UserType};
        break;
  
      case "LOGOUT":
        newState = { isAuthenticated: false, user: null };
        break;
  
      case "UPDATE_USER":
        newState = {
          ...state,
          user: { ...state.user, ...action.payload as UserType },
        };
        break;
  
      default:
        return state;
    }
  
    localStorage.setItem('userState', JSON.stringify(newState));
    return newState;
  };

export default userReducer;