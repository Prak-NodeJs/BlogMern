import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'
const UserBlogs = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem('userid')
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:8000/api/user/${id}`)
      .catch((err) => console.log(err))
    const data = await res.data

    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data.blog.blogs))
  }, [])
  console.log(user)
  return (
    <div>
      {user &&
        user.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  )
}

export default UserBlogs
