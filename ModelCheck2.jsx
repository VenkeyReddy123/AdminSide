import React, { useState } from 'react'

const ModelCheck2 = () => {
    const [taskName, setTaskName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
  
    const handleTaskSubmit = (event) => {
      event.preventDefault();
      // Logic to handle form submission
      console.log("Task Name:", taskName);
      console.log("Category:", category);
      console.log("Description:", description);
      // Reset form fields
      setTaskName('');
      setCategory('');
      setDescription('');
    };
  return (
   <>
     
   </>
  )
}

export default ModelCheck2