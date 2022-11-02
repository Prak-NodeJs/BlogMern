import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Blogs from './Components/Blogs'
import { Header } from './Components/Header'
import AddBlog from './Components/AddBlog'
import UserBlogs from './Components/UserBlogs'
import BlogDetails from './Components/BlogDetails'
import Auth from './Components/Auth'
import { useSelector } from 'react-redux'
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />}></Route>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />}></Route>
              <Route path="/blogs/add" element={<AddBlog />}></Route>

              <Route path="/myblogs" element={<UserBlogs />}></Route>
              <Route path="/myblogs/:id" element={<BlogDetails />}></Route>
            </>
          )}
        </Routes>
      </main>
    </Fragment>
  )
}

export default App
