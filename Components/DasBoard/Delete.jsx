import React from 'react'
import Modify from '../Modify'
import { useLocation } from 'react-router-dom'

const Delete = (props) => {
    const Location =useLocation()
    console.log(Location.state)

  return (
   <>
      {/* <Modify/> */}
   </>
  )
}

export default Delete