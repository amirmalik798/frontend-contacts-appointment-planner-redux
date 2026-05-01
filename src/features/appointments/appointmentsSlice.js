import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadStateFromLS = () => {
    try {
        const state = localStorage.getItem('appointments');
        return (state ? JSON.parse(state) : []);
    } catch(e) {
        return [];
    }
}

export const isDuplicateAppointment = (appointments, newAppointment) => {
    const title = newAppointment.title.trim().toLowerCase();
    const contact = newAppointment.contact;
    const date = newAppointment.date;
    const time = newAppointment.time;

    return appointments.some(appointment => appointment.title === title &&
        appointment.contact === contact && 
        appointment.date === date &&
        appointment.time === time
    );
} 

export const isOccupiedDateTime = (appointments, newAppointment) => {
    const date = newAppointment.date;
    const time = newAppointment.time;
    return appointments.some(appointment => appointment.date === date &&
        appointment.time === time
    );
}

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: loadStateFromLS(),
    reducers: {
        addAppointment: (state, action) => {
            return [...state, {...action.payload, id: nanoid()}];
        },
        removeAppointment: (state, action) => {
            return state.filter(appointment => appointment.id !== action.payload);
        },
        editAppointment: (state, action) => {

        }
    }
});


export const {addAppointment, removeAppointment, editAppointment} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
