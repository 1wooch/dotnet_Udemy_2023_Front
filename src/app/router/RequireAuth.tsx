import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth(){
    const {user} = useSelector(state => state.account);
    const location = useLocation();

    if(!user){
        return <Navigate to= '/login' state={{from: location.pathname}}/>

    }
    return<Outlet/>

}