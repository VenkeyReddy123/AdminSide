import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ImageCheck=()=>{
    const[Image,setImage]=useState(null)
    const HandleImage=()=>{
    //     const Data={
    //         Image:Image
    //     }
    // axios.post("http://127.0.0.1:8000/ImageCheckDetails/",Data, {headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }}).then((d)=>{
    //     alert('Succcess')
    //     console.log(d.data)
    // }).then((e)=>{
    //     alert("Error")
    //     console.log('error')
    // })
    console.log(Image)
    }
    
  return(
    <>
           <form  onSubmit={(e)=>{
            e.preventDefault()
            HandleImage()
           }} action="">
            <label htmlFor="">Select Image</label>
            <input type="file" accept='image/*' multiple  onChange={(event)=>{setImage(event.target.files)}} />
            <input type='submit' />
           </form>
    </>
  )
}
export default ImageCheck