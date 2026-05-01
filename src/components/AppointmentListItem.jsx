import { removeAppointment } from '../features/appointments/appointmentsSlice';
import { useDispatch } from "react-redux";
import { useState } from 'react';

const AppointmentListItem = ({item}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(item);

    const handleRemoveItem = () => {
        const confirmed = window.confirm(`Are you sure you want to delete appointment with title: ${item.title}?`)
        if (confirmed) {
            dispatch(removeAppointment(item.id));
        }
    }

    return (
        <div className='tile-container'>
            <div className="tile-details-container">
                <p className='tile tile-title'>{item.title}</p>
                <p>Contact: {item.contact}</p>
                <p>Date: {item.date}</p>
                <p>Time: {item.time}</p>
            </div>
            <div className="tile-buttons-container">
                <button onClick={handleRemoveItem}>❌</button>
            </div>
            
        </div>
    )
}

export default AppointmentListItem;