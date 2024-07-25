import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {

  const {user} = useContext(UserContext)
  console.log(user)
  return (
    <>
      {user.username}
    </>
  )
}

export default Profile