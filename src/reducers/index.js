import { combineReducers} from 'redux';
import remindersReducer from './reminders';
import editReminderReducer from './editReminder';

const rootReducer = combineReducers( {
   reminders: remindersReducer,
   editReminder: editReminderReducer
});

export default rootReducer;