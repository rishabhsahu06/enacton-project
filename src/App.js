import React from 'react'
import Navbar from "./Components/Navbar"
import AllStores from './Components/AllStores'
import Sidebar from './Components/Sidebar'

function App() {
  return (
   <>
   <Navbar/>
   <div className='flex justify-center'>

   </div>

   <div className='flex'>
    <Sidebar/>
    <AllStores/>
   </div>
 
   </>
  )
}

export default App