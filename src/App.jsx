import { useState } from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import Layout from './pages/Layout';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<ContactsPage/>}></Route>
      <Route path='/contacts' element={<ContactsPage/>}></Route>
      <Route path='/appointments' element={<AppointmentsPage/>}></Route>
    </Route>
));

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
