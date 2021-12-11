import React, { Component } from 'react';
import shortid from 'shortid';

import InputForm from './components/InputForm/InputForm';
import Filter from './components/Filter/Filter';
import Phonebook from './components/Phonebook/Phonebook';
import Container from './components/Container/Container';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    const { contacts } = this.state;

    const sameContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (sameContact) {
      alert(`${name} is already exists!`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter),
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;
    return (
      <>
        <Container title="Phonebook">
          <InputForm onSubmit={this.addContact} />
        </Container>
        <Container title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <Phonebook
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        </Container>
      </>
    );
  }
}

export default App;
