import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './formPhone.module.css';

// Пропсы передаем в функцию как параметры
export default function FormPhoneBook({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = uuidv4();
  const numberId = uuidv4();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    // Делаем свич
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
// Вызываем пропс , передаем параметры
    onSubmit(name, number);
    // очистка вместо ресета
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor={nameId}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          id={nameId}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и
                пробелов. Например Adrian, Jacob Mercer, Charles de Batz de
                Castelmore d'Artagnan и т. п."
          required
          onChange={handleChange}
        />
      </label>
      <label className={s.label} htmlFor={numberId}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          id={numberId}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChange}
        />
      </label>
      <button className={s.btn} type="submit">
        Add to contacts
      </button>
    </form>
  );
}
