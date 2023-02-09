import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Notices from './components/dashboard/Notices';
import Activities from './components/dashboard/Activities';
import Settings from './components/dashboard/Settings';
import Findforums from './components/dashboard/Findforums';
import Postdetails from './components/dashboard/Postdetails';
import ForumDetails from './components/dashboard/dashboardhome/forums/ForumDetails';

function App() {
  return (

    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard routevar="recent"/>}></Route>
        <Route path='/dashboard/posts/:id' element={<Postdetails/>}></Route>
        <Route path='/dashboard/create' element={<Dashboard routevar="create"/>}></Route>
        <Route path='/dashboard/forum' element={<Dashboard routevar="joinedforums"/>}></Route>
        <Route path='/dashboard/forum/myforums' element={<Dashboard routevar="myforums"/>}></Route>
        <Route path='/dashboard/notice' element={<Notices/>}></Route>
        <Route path='/dashboard/findforums' element={<Findforums/>}></Route>
        <Route path='/dashboard/settings' element={<Settings/>}></Route>
        <Route path='/dashboard/activities' element={<Activities/>}></Route>
        <Route path='/dashboard/forums/:id' element={<ForumDetails/>}></Route>


        {/* <Routes path='/' element={<Login/>}></Routes> */}
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
