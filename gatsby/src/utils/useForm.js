import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    const { value, name, type } = e.target;
    if (type === 'number') parseInt(value);
    setValues({
      ...values,
      [name]: value,
    });
  }

  function resetForm(val) {
    setValues(val);
  }

  return { values, updateValue, resetForm };
}
