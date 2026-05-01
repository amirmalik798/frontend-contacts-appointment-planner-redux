import { useSelector } from 'react-redux';
import AppointmentListItem from './AppointmentListItem';

const AppointmentsList = () => {    
    const appointments = useSelector(state => state.appointments);
    return (
        <>
        <h4>Total Appointments: {appointments.length}</h4>
        <div className='grid'>
            { appointments.map((item, index) => {
                return <AppointmentListItem key={index} item={item}></AppointmentListItem>
            })} 
        </div>
        </>
    )
}

export default AppointmentsList;