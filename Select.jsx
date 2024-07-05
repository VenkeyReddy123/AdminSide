import React, { useState } from 'react';

function SelectExample() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h2>Select an option:</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default SelectExample;
