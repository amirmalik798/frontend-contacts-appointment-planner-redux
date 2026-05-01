import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addContact, isDuplicateContact } from "../features/contacts/contactsSlice";

const ContactForm = () => {
    //contacts are imported here from the store
    //just to check for duplicates
    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const clearFormFields = () => {
        setName("");
        setPhone("");
        setEmail("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        //guard clause
        if (!name?.trim() || !phone?.trim() || !email?.trim()) {
            setError('Error: Please Input Data in All Fields.');
            return;
        }
        const newContact = {name, phone, email};
        //guard clause against duplicate insertions
        if (isDuplicateContact(contacts, newContact)) {
            setError('Error: This Contact Already Exists. Check Phone# & Email.');
            return;
        }
        dispatch(addContact(newContact));
        clearFormFields();
    }

    return (
        <div>
            <h2>Create Contact</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                 value={name}
                 placeholder="Contact Name"
                 onChange={(e) => setName(e.target.value)}
                 required />
                 <input type="text"
                 value={phone}
                 placeholder="Phone #"
                 onChange={(e) => setPhone(e.target.value)}
                 required />
                 <input type="text"
                 value={email}
                 placeholder="Email"
                 onChange={(e) => setEmail(e.target.value)}
                 required />
                 {error && <span className='error'>{error}</span>}
                 <input type="submit" value="Add Contact"/>
            </form>
            
            </div>
    )
}

export default ContactForm;
