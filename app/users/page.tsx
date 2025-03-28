'use client'

import React from 'react'
import useFetch from '../../hooks/useFetch'

interface User {
  id:number;
  name:string;
}

const getUsers = () => {
  try {
    const {data} = useFetch('data')
    return data.json()
  } catch(error) {
    console.error(error)
  }
}

const Users = async () => {
  const users:User[] = getUsers()

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map(user =>
          <li key={user.id}>{user.name}</li>
        )}
      </ul>
    </>
  )
}

export default Users