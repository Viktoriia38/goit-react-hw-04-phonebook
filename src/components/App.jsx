import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import css from './App.module.css';
const { Component } = require('react');

const LOCAL_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: this.getLocalData() ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  getLocalData() {
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    return localData;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
  }

  sendContact = contact => {
    const repeatName = this.state.contacts.find(({ name }) => {
      return contact.name === name;
    });
    if (repeatName) {
      alert(`${contact.name} is already in your contacts!`);
      return;
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, { id: nanoid(), ...contact }],
        };
      });
    }
  };

  onBtnDelete = e => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== e.target.id
        ),
      };
    });
  };

  handleFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  render() {
    const { contacts } = this.state;
    const filterContact = contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <div action="" className={css.phonebook}>
          <h1 className={css.phonebookTitle}>Phonebook</h1>
          <ContactForm onSubmit={this.sendContact} />
          <h1 className={css.contactTitle}>Contacts</h1>
          <Filter onChange={this.handleFilter} value={this.state.filter} />
          <ContactList
            contacts={filterContact}
            onBtnDelete={this.onBtnDelete}
          />
        </div>
      </div>
    );
  }
}
