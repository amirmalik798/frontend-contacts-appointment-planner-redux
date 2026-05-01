import React from "react";
import { useSelector } from "react-redux";

const ContactPicker = ({onChange}) => {
    const contacts = useSelector(state => state.contacts);
    let options = contacts.map((contact, index) => (
        <option key={index} value={contact.name}>
            {contact.name}
        </option>
    ));
    return (
        <select onChange={onChange} required>
            <option value="" disabled selected hidden>Select Contact</option>
            {options}
        </select>
  );
};

export default ContactPicker;