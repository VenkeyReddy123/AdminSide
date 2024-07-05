import React, { useState } from 'react';

function TaskModal() {
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
    // <div className="modal" id="task">
    //   <div className="modal-dialog modal-lg">
    //     <div className="modal-content">
    //       <div className="modal-header bg-danger">
    //         <h4>ADD Task</h4>
    //         <button className="close" data-dismiss="modal"><i className="fa-solid fa-circle-xmark"></i></button>
    //       </div>
    //       <div className="modal-body">
    //         <form onSubmit={handleTaskSubmit}>
    //           <div className="form-group">
    //             <label className="form-chek-label">Task</label>
    //             <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" className="form-control" />
    //           </div>
    //           <div className="form-group">
    //             <label className="form-chek-label">Category</label>
    //             <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
    //               <option>select Category</option>
    //               <option>Development</option>
    //               <option>Testing</option>
    //               <option>Production</option>
    //               <option>Bug fixing</option>
    //             </select>
    //           </div>
    //           <div className="form-group">
    //             <label className="form-chek-label">Description</label>
    //             <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
    //           </div>
    //           <div className="form-group">
    //             <input type="submit" value="Add Task" className="btn btn-md btn-danger" />
    //             <button type="button" className="btn btn-md btn-danger" data-dismiss="modal">Close</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
   <>
   
   </>
  );
}

export default TaskModal;
