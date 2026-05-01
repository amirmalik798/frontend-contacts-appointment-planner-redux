import { removeContact, editContact } from "../features/contacts/contactsSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react';

const ContactListItem = ({item}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(item);
    const [error, setError] = useState("");
    
    const handleRemoveItem = () => {
        const confirmed = window.confirm(`Are you sure you want to delete ${item.name}'s contact? `);
        if (confirmed) {
            dispatch(removeContact(item.id));
         }
    } 
        
    
    const handleCancel = () => {
        setFormData(item);
        setIsEditing(false);
    }
    
    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trimStart();
        }));
    }

    const handleSave = () => {
        setError('');
        if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
            setError('Error: Please Provide Data in Fields.');
            return;
        }
        dispatch(editContact(formData));
        setIsEditing(false);
        setError('');
    }

    return (
        <div className='tile-container'>
            <div className="tile-details-container">
                { isEditing ? (
                    <>
                    <input
                    name="name"
                    value={formData.name || ""}
                    placeholder="Contact Name"
                    onChange={handleChange}
                    />
                    <input
                    name="phone"
                    value={formData.phone || ""}
                    placeholder="Phone #"
                    onChange={handleChange}
                    ></input>
                    <input
                    name="email"
                    value={formData.email || ""}
                    placeholder="Email"
                    onChange={handleChange}
                    ></input>
                    </>
                ) : (
                    <>
                    <p className='tile tile-title'>{item.name}</p>
                    <p className='tile'>☏ {item.phone}</p>
                    <p className='tile'>✉ {item.email}</p>
                    </>
                )}
            </div>
            <div className="tile-buttons-container">
                { isEditing? (
                    <>
                    <button onClick={handleSave}>💾</button>
                    <button onClick={handleCancel}>🚫</button>
                    </>
                ) : (
                    <>
                    <button onClick={() => setIsEditing(true)}>✎</button>
                    <button onClick={handleRemoveItem}>❌</button>
                    </>
                )}
            </div>
            {error && <span styles={{marginTop: '3px'}}>{error}</span>}
        </div>
    )
}

export default ContactListItem;
