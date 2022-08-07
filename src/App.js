import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './_app.scss'
import { useSelector } from 'react-redux'
import WatchScreen from './screens/watchScreen/WatchScreen'

const Layout = ({ children }) => {
   const [sidebar, toggleSidebar] = useState(false)

   const handleToggleSidebar = () => toggleSidebar(value => !value)

   return (
      <>
         <Header handleToggleSidebar={handleToggleSidebar} />
         <div className='app__container'>
            <Sidebar
               sidebar={sidebar}
               handleToggleSidebar={handleToggleSidebar}
            />
            <Container fluid className='app__main '>
               {children}
            </Container>
         </div>
      </>
   )
}

const App = () => {
   const { accessToken, loading } = useSelector(state => state.auth)

   const navigate = useNavigate()

   useEffect(() => {
      if (!loading && !accessToken) {
         navigate('/auth')
      }
   }, [accessToken, loading, navigate])

   return (
      <Routes>
         <Route path='/' exact>
            <Layout>
               <HomeScreen />
            </Layout>
         </Route>

         <Route path='/auth'>
            <LoginScreen />
         </Route>

         <Route path='/search'>
            <Layout>
               <h1>Search Results</h1>
            </Layout>
         </Route>
         <Route path='/watch/:id'>
            <Layout>
               <WatchScreen />
            </Layout>
         </Route>
         <Route>
            <Navigate to='/' />
         </Route>
      </Routes>
   )
}

export default App