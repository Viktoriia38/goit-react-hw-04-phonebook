import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';
const { useState, useEffect } = require('react');

const LOCAL_KEY = 'contacts';

export function App() {
  const getLocalData = () => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    return localData;
  };

  const [contacts, setContacts] = useState(
    getLocalData() ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const sendContact = contact => {
    const repeatName = contacts.find(({ name }) => {
      return contact.name === name;
    });
    if (repeatName) {
      alert(`${contact.name} is already in your contacts!`);
      return;
    }
    setContacts([...contacts, { id: nanoid(), ...contact }]);
  };

  const onBtnDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e.target.id));
  };

  const handleFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div action="" className={css.phonebook}>
        <h1 className={css.phonebookTitle}>Phonebook</h1>
        <ContactForm onSubmit={sendContact} />
        <h1 className={css.contactTitle}>Contacts</h1>
        <Filter onChange={handleFilter} value={filter} />
        <ContactList contacts={filterContact} onBtnDelete={onBtnDelete} />
      </div>
    </div>
  );
}
