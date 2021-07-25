import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import GlobalStyles from './styles/global'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserContextProvider>
      <GlobalStyles />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes />
    </UserContextProvider>
  )
}

export default App
