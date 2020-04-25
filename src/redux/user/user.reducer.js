const INITIAL_STATE = {
    currentUser: null
}

// podczas gdy state jest undefined sam inicjalizuje się do INITIAL_STATE
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;
