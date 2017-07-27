const initialState = {
    userId: null,
    token:null
};

export const SUBMIT_ID = 'submit id';

export default function userId (state = initialState, action){
  switch (action.type) {
    case SUBMIT_ID:
      return {
        ...state,
          userId: action.userId,
          token: action.token,
      }
    default:
      return state;
  }
}
