import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ModifyFIle = () => {
 
  const Location=useLocation()
  console.log(Location.state)
  const [setOut_Of_Task, SetSelectOutOfTask] = useState(false)
  const PRef = useRef(null)
  const Dref = useRef(null)
  const CNRef = useRef(null)
  const PRRef = useRef(null)
  const SRef = useRef(null)
  const IRef = useRef(null)
  const handleOutOfTask = (event) => {
    SetSelectOutOfTask(event.target.value)
  }
    const HandleData = () => {
        const pname = PRef.current.value
        const des = Dref.current.value
        const cnname = CNRef.current.value
        const price = PRRef.current.value
        const stack = SRef.current.value
        const image = IRef.current.files[0]

      
        const Data = {
          "pk":8,
          "Product_Name":'pname',
        }
        axios.delete("http://127.0.0.1:8000/ProductDetails/", Data).then(response => {
        console.log('Response:', response);
        // Handle successful response
      }).catch(error => {
        console.error('Error:', error);
        // Handle error
      });
        const Data2={
          'Product_Name':pname,  
          "P_Images":image
        }
    }
  return (
    <>
       <div className='' style={{background:'#289304',overflowX:'hidden'}}>
      <div className='row col-11 ml-auto mr-auto'>
        <div className='col-md-12 mt-5'>
          <div className='row justify-content-center'>
            <div className='col-md-5 col-sm-12 p-3 shadow-lg' style={{ background: '#D87E9C', borderRadius: '50px' }}>
              <div className='p-3'>
                <h4>Modify Yourt Product</h4>
                <form onSubmit={HandleData}>
                  <div className='form-group'>
                    <label htmlFor="pn">Product Name</label>
                    <input className='form-control' type="text" ref={PRef} placeholder='Enter Product Name' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="desc">Description</label>
                    <textarea className='form-control' type="text" ref={Dref} placeholder='Enter Product Description'></textarea>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="price">Category Name</label>
                    <input className='form-control' type="text" ref={CNRef} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="price">Price</label>
                    <input className='form-control' ref={PRRef} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="price">Stock</label>
                    <input className='form-control' type="number" ref={SRef} />
                  </div>
                  <div className='form-group'>
                    <label htmlFor="price">Out of Stock</label>
                    <select className='form-control' value={setOut_Of_Task} onChange={handleOutOfTask}>
                      <option value='true'>True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor="image">Select image</label>
                    <input type="file" className='form-control-file' name="image" id="image" accept='image/*' ref={IRef} />
                  </div>
                  <div className='text-center'>
                    <input className='btn btn-warning' type="submit" value="Click To Modify" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ModifyFIle