// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import LoginNav from './Components/Nav/LoginNav';
import Home from './Pages/Home';
import Register from './Components/Register/Register';
// import Protected from './Components/Protected/Protected';
import Profile from './Components/Profile/Profile';
import CreateTask from './Components/Tasks/CreateTask';
import AllTask from './Components/Tasks/AllTask';
import EditTask from './Components/Tasks/EditTask';

function App() {
  const token = localStorage.getItem('access-token');
  // const nToken = token.replace(/"/g, "");
  // console.log(token)
  return (
    <>
      <Router>
        
        {token ? (<LoginNav></LoginNav>) : (<Nav></Nav>)}
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          {/* <Route path='/home' element={<Home></Home>}></Route> */}
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/create-task' element={<CreateTask></CreateTask>}></Route>
          <Route path='/tasks' element={<AllTask></AllTask>}></Route>
          <Route path='/task/:uid' element={<EditTask></EditTask>}></Route>
          {/* <Route path='/add-contacts' element={<AddContacts></AddContacts>}></Route> */}
          {/* <Route path='/contacts/:contactId' element={<ContactDetails contacts={contacts}></ContactDetails>}></Route> */}
          {/* <Route path='/contacts/edit-contact/:contactId' element={<EditContact contacts={contacts}></EditContact>}></Route> */}
          {/* <Route path='*' element={<NotFound></NotFound>}></Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
