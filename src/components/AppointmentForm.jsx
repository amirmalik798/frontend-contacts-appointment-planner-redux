import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addAppointment, isDuplicateAppointment, isOccupiedDateTime } from "../features/appointments/appointmentsSlice";
import ContactPicker from './ContactPicker';

const AppointmentForm = () => {
    const contacts = useSelector(state => state.contacts);
    const appointments = useSelector(state => state.appointments);

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [contact, setContact] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");

    const clearFormFields = () => {
        setTitle("");
        setContact("");
        setDate("");
        setTime("");
    }

    const getTodayString = () => {
        const [month, day, year] = new Date()
        .toLocaleDateString("en-US")
        .split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError("Error: Please Input Data in All Fields");
            return;
        } 
        if (title.length > 50) {
            setError("Error: Title is Too Long.");
            return;
        }
        const newAppointment = {title, contact, date, time};
        if (isOccupiedDateTime(appointments, newAppointment)) {
            setError("Error: This Date/Time is Already Occuppied.");
            return;
        }
        if (isDuplicateAppointment(appointments, newAppointment)) {
            setError("Error: Appointment With Same Details Already Exists.")
            return;
        }
        dispatch(addAppointment(newAppointment));
        clearFormFields();
    }

    return (
        <div>
            <h2>Create Appointment</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Appointment Title"
                required/>
                <ContactPicker
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                />   
                <input type="date"
                value={date}
                min={getTodayString()}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Appointment Date"
                required />
                <input type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Appointment Time"
                required />
                {error && <span className='error'>{error}</span>}
                <input type="submit" value="Create Appointment"></input>
            </form>
        </div>
    )
}

export default AppointmentForm;