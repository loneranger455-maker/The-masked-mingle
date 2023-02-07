import React from "react";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Recent from "./dashboardhome/Recent"
import { useNavigate } from "react-router";
import Createpost from "./dashboardhome/Createpost";
import Joinedforums from "./dashboardhome/forums/Joinedforums";
import Myforums from "./dashboardhome/forums/Myforums";

function Button(props){
  const navigate=useNavigate()
  return(<button style={{backgroundColor:props.color}} onClick={()=>navigate(`/dashboard/${props.nav}`)} class= "hover:bg-[var(--primarycolor)] text-black py-2 px-4 rounded">
  {props.data}
</button>)
}

function Dashboard(props) {
 
  return (
    
    <div className="flex">
      <Sidebar value="home"/>
      <div className="w-4/5  ">
        <Topbar />
        
        <nav className="flex w-[60%]  justify-between px-20 pb-5 mt-8  ">
        {props.routevar==="recent"?<Button data="recent" color="var(--primarycolor)" nav=''/>:<Button data="recent" color="var(--secondarycolor)" nav=''/>}
        {props.routevar==="create"?<Button data="create" color="var(--primarycolor)" nav='create'/>:<Button data="create" color="var(--secondarycolor)" nav='create'/>}
        {(props.routevar==="joinedforums" || props.routevar==="myforums")?<Button data="forums" color="var(--primarycolor)" nav='forum'/>:<Button data="forums" color="var(--secondarycolor)" nav='forum'/>}
        

          {/* <button style={{backgroundColor:'var(--primarycolor)'}} onClick={()=>navigate('/dashboard')} class=" hover:bg-[var(--primarycolor)] text-black py-2 px-4 rounded">
            Feeds
          </button>
          <button style={{backgroundColor:'var(--primarycolor)'}} onClick={()=>navigate('/dashboard/create')} class= "hover:bg-[var(--primarycolor)] text-black py-2 px-4 rounded">
            Create Post
          </button>
          <button style={{backgroundColor:'var(--primarycolor)'}} onClick={()=>navigate('/dashboard/forum')} class= "hover:bg-[var(--primarycolor)] text-black py-2 px-4 rounded">
            Forums
          </button> */}
         
        </nav>
        <div className='overflow-scroll overflow-x-auto'>
        <Rightbar />
        {props.routevar==="recent"?<Recent/>:props.routevar==="create"?<Createpost/>:props.routevar==="joinedforums"?<Joinedforums/>:<Myforums/>}
        </div>
        
        
    </div>
      </div>

  );
}

export default Dashboard;
