import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export function ContactList({ contacts, onBtnDelete }) {
  return (
    <ul className={css.contactList}>
      {contacts.map(item => (
        <li className={css.contactItem} key={item.id}>
          {item.name}:<span className={css.contactNumber}>{item.number}</span>
          <button className={css.contactBtn} id={item.id} onClick={onBtnDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onBtnDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
