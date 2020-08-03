import React from "react";
import * as moment from 'moment';
import useLocalStorage from "./UseLocalStorage";

// Hook
export default function useContacts() {
    const initialValue = [
        {
        key: 0,
        name: 'Jack',
        phone: '+9 576 231 45 22',
        gender: 'male',
        birthday: moment(),
        relative: false,
        },
        {
        key: 1,
        name: 'Jack',
        phone: '+9 576 231 45 22',
        gender: 'male',
        birthday: moment(),
        relative: false,
        }
    ]
    const [storageValue, setStorageValue] = useLocalStorage('contacts', initialValue)
    const [contacts, setContacts] = React.useState(storageValue);


    const saveContacts = (contacts) => {
        setContacts(contacts)
        setStorageValue(contacts)
    }
  
    const addNewContact = (contact) => {
      contact.key = contacts.length
      saveContacts(contacts.concat(contact))
    };
  
    const updateContact = (index, values) => {
      const contactsArray = [...contacts]
      contactsArray.splice(index, 1, values)
      saveContacts(contactsArray)
    };
    const deleteContact = (index) => {
      const contactsArray = [...contacts]
      contactsArray.splice(index, 1)
      saveContacts(contactsArray)
    }
  
    return {
      contacts,
      addNewContact,
      updateContact,
      deleteContact,
    }
  }