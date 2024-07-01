const remindersReducer = (state = [], action) => {
    switch (action.type){
        case 'ADD_REMINDER':
            return [...state, action.payload];
        case 'UPDATE_REMINDER':
            return state.map(r => (r.id === action.payload.id ? action.payload : r));
        default:
            return state;
    }
};

export default remindersReducer;