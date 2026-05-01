import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contacts/contactsSlice';
import appointmentsReducer from '../features/appointments/appointmentsSlice';

const saveDataToLS = (dataType, data) => {
    try {
        localStorage.setItem(dataType, JSON.stringify(data));
    } catch(e) {
        console.log('Error Saving Contacts.');
    }
}

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        appointments: appointmentsReducer
    }
});

store.subscribe(() => {
    saveDataToLS('contacts',store.getState().contacts);
    saveDataToLS('appointments', store.getState().appointments);
});
