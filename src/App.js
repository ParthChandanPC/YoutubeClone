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
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import ChannelScreen from './screens/channelScreen/ChannelScreen'
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
         <Route path='/' exact
            element={<Layout>
               <HomeScreen />
            </Layout>}
         >  
         </Route>
         <Route path='/auth'
            element={<LoginScreen />}
         >  
         </Route>
         <Route path='/search/:query'
            element={<Layout>
               <SearchScreen />
            </Layout>}
         >   
         </Route>
          <Route path='/watch/:id'
            element={<Layout>
               <WatchScreen />
            </Layout>}>
         </Route>
         <Route path='/feed/subscriptions' 
            element={<Layout>
               <SubscriptionsScreen />
            </Layout>}> 
         </Route>
         <Route path='/channel/:channelId' 
            element={<Layout>
               <ChannelScreen />
            </Layout>}> 
         </Route>
         <Route element={<Navigate to='/' />}>
         </Route> 
      </Routes>
   )
}

export default App