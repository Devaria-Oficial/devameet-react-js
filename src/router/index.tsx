import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";
import {Login} from '../views/Login';
import { Profile } from "../views/Profile";
import {Register} from '../views/Register';
import { MeetAddView } from "../views/MeetAdd";
import { MeetEditView } from "../views/MeetEdit";
import { LinkView } from "../views/Link";
import { RoomView } from "../views/Room";

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

        const router = [
            {
                path: '*',
                id: 'home',
                element: <Home/>
            },
            {
                path: '/user',
                id: 'user',
                element: <Profile />
            },
            {
                path: '/room/:link',
                id: 'room',
                element: <RoomView />
            }
        ];

        const mobile = window.innerWidth <= 992;

        if(!mobile){
            router.push({
                path: '/add',
                id: 'add',
                element: <MeetAddView />
            });

            router.push({
                path: '/edit/:meetId',
                id: 'edit',
                element: <MeetEditView />
            });
        }else{
            router.push({
                path: '/link',
                id: 'link',
                element: <LinkView />
            });
        }

        return  createBrowserRouter(router);
    }
}