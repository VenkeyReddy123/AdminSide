import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PageCheking = () => {
    const[Data,setData2]=useState()
    useEffect(()=>{
  
        axios.get("http://127.0.0.1:8000/LCODetails/  ").then((d)=>{
          const FilterData=  d.data.filter((e)=>{
            
              return e.Order_Id.username===Number(localStorage.getItem('id'))
            })
    
            setData2(FilterData)
        })
        
  },[])
  return (
    <>
          
    </>
  )
}

export default PageCheking