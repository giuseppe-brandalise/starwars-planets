import { useState } from 'react';

function useFormFilter(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(newValue) {
    setValue(newValue);
  }

  return {
    value,
    onChange: handleChange,
  };
}

export default useFormFilter;
