import { createSlice, nanoid } from '@reduxjs/toolkit';

//LS - Local Storage
const loadStateFromLS = () => {
    try {
        const state = localStorage.getItem('contacts');
        return (state ? JSON.parse(state) : []);
    } catch(e) {
        return [];
    }
}

export const isDuplicateContact = (contacts, newContact) => {
    const phone = newContact.phone.toLowerCase();
    const email = newContact.email.toLowerCase();
    return contacts.some(contact => contact.phone.toLowerCase() === phone || contact.email.toLowerCase() === email);
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: loadStateFromLS(),
    reducers: {
        addContact: (state, action) => {
            //immutable update
            //redux toolkit supports mutable updates through immer
            //but i prefer to perform immutable updates
            const newContact = action.payload;
            const exists = state.some(contact => contact.phone === newContact.phone || contact.email === newContact.email);
            if (exists) { return; }
            return [...state, {...action.payload, id: nanoid()}];
        },
        removeContact: (state, action) => {
            //immutable update
            return state.filter(contact => contact.id !== action.payload);
        },
        editContact: (state, action) => {
            const contact = state.find(contact => contact.id === action.payload.id);
            if (contact) {
                Object.assign(contact, action.payload);
            }
        }
    }
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer; 

