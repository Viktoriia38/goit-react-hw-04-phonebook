import PropTypes from 'prop-types';
import css from './Filter.module.css';

export function Filter({ value, onChange }) {
  return (
    <label className={css.name} htmlFor="">
      Find contacts by Name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.userName}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
