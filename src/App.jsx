import { useState } from 'react'
import Login from "./Component/Page/Login";
import Layout from "./Component/Layout/Layout";
import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Component/Page/Maps";
import Bookmarks from "./Component/Page/Bookmarks";
import ContextProvider from "./Context/ContextProvider";
import Snapbar from "./Component/Layout/Notify";
import BasicModal from './Component/Layout/Modal';
function App() {
  return (
    <ContextProvider>
        <Snapbar/>
        <BasicModal/>
      <Routes>
        <Route path='/Login' element={<Login/>} />
          <Route path='/'  element={<Home/>}/>
          <Route path='/bookmarks'  element={<Bookmarks/>}/>
      </Routes>
      {/*<Layout>*/}

      {/*</Layout>*/}
    </ContextProvider>
  )
}

export default App
