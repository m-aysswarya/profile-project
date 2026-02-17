import React from 'react'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <ProfilePage />
    </>
  )
}

export default App
