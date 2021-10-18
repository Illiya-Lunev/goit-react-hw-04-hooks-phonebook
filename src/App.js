import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormPhoneBook from './componets/FormPhoneBook/FormPhoneBook.jsx';
import ContactList from './componets/ContactList/ContactList.jsx';
import Filter from './componets/Filters/Filters.jsx';
import s from './componets/FormPhoneBook/formPhone.module.css';


export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const currentContacts = JSON.parse(localStorage.getItem('contacts')) ?? '';
    currentContacts && setContacts(currentContacts);
  }, []);

  useEffect(() => {
    // Записываем в Локал сторедж
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const formSubmitHandler = (name, number) => {
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    setContacts(prevState => [newContact, ...prevState]);
  };


  const deleteContacts = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const handleContactsFilter = e => {
    setFilter(e.currentTarget.value);
};

  const filteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <div>
      <h1 className={s.title}>Phonebook</h1>
      <FormPhoneBook onSubmit={formSubmitHandler} />
      <h2 className={s.title}>Contacts</h2>
      <Filter onChange={handleContactsFilter} value={filter} />
      <ContactList
        onDeleteContact={deleteContacts}
        contacts={filteredContacts()}
      />
    </div>
  );
}
