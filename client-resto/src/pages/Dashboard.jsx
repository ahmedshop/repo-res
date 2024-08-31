import React from 'react'
import axios from '../config/axios'

const Dashboard = () => {

  const onClick = () => {
    axios.get('/401')
  }
  return (
    <button onClick={onClick}>test 401</button>
  )
}

export default Dashboard