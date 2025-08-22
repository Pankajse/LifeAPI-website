import 'remixicon/fonts/remixicon.css'
import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import OrgSignUp from './pages/OrgSignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import BloodCompatibility from './pages/BloodCompatibility';
import Eligibility from './components/Eligibility';
import DonationCenters from './pages/DonationCenters';
import Events from './components/Events';
import Stories from './components/Stories';
import Faq from './components/Faq';
import Footer from './components/Footer';
import CreateEvent from './pages/CreateEvent';
import OrgHome from './pages/OrgHome';
import StoryPage from './pages/StoryPage';
import EventPage from './pages/EventPage';
import  EventRegister from './pages/RegisterForEvents';
import { Outlet, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<UserInterface/>} ></Route>
        </Route>
      </Routes>
    </div>
  )
}

function Layout(){
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

function OrgInterface(){
  return (
    <div>
      <NavBar />
      <OrgHome />
      <About />
      <BloodCompatibility />
      <Stories />
      <Faq />
      <Footer />
    </div>
  )
}

function UserInterface() {
  return(
    <div>
    <Home />
    <About />
    <BloodCompatibility />
    <Eligibility />
    <DonationCenters />
    <Events />
    <Stories />
    <Faq />
    <Footer />
  </div>
  )
}

export default App
