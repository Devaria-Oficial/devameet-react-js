import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import {Login} from '../views/Login';
import { Profile } from "../views/Profile";
import {Register} from '../views/Register';

export const getRouter = (token: string) => {
    if(!token){
        return createBrowserRouter([
            {
                path: '*',
                id: 'login',
                element: <Login/>
            }, 
            {
                path: '/register',
                id: 'register',
                element: <Register/>
            }
        ]);
    }else{
        return createBrowserRouter([
            {
                path: '*',
                id: 'home',
                element: <Home/>
            },
            {
                path: '/user',
                id: 'user',
                element: <Profile />
            }
        ]);
    }
}