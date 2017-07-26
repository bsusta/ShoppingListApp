const initialState = {
  userId: null,
};

export const SUBMIT_ID = 'submit id';

export default function userId (state = initialState, action){
  switch (action.type) {
    case SUBMIT_ID:
      return {
        ...state,
        userId: action.userId,
      }
    default:
      return state;
  }
}
