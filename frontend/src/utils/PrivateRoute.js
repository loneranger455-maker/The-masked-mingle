
import { GetToken } from "../services/Localstorageservice";

import React from 'react'
import { Navigate } from "react-router";
function PrivateRoute({children}) {
    const {access}=GetToken()
    if(access){
  return children
}
else{
return <Navigate to='/'></Navigate>
}
}

export default PrivateRoute