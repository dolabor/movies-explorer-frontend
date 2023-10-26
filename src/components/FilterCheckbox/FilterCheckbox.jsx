import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ value, onChange }) {

  return (
    <section className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={value}
          onChange={onChange}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__caption">Короткометражки</p>
    </section>
  );
}

export default FilterCheckbox;
