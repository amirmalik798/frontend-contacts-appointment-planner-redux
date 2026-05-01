import ContactListItem from './ContactListItem';
import { useSelector } from 'react-redux';

const ContactsList = () => {
    const contacts = useSelector(state => state.contacts);    
    return(
        <>
        <h4>Total Contacts: {contacts.length} </h4>
        <div className='grid'>
            
            { contacts.map((item, index) => {
                return <ContactListItem key={index} item={item}></ContactListItem>
            })} 
        </div>
        </>
    )
}

export default ContactsList;