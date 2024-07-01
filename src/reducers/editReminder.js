const editReminderReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_EDIT_REMINDER':
            return action.payload;
        case 'CLEAR_EDIT_REMINDER':
            return null;
        default:
            return state;
    }
};

export default editReminderReducer;