
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import { FC } from "react";


interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

const routes: Array<Route> = [
    // {
    //     key: "route-home",
    //     title: "Home",
    //     path: "/",
    //     enabled: true,
    //     component: Home
    // },

    // {
    //     key: "route-auth",
    //     title: "Login",
    //     path: "/login",
    //     enabled: true,
    //     component: Login
    // },
    // {
    //     key: "route-payment",
    //     title: "Payment",
    //     path: "/payment",
    //     enabled: true,
    //     component: Payment
    // },
    // {
    //     key: "route-RestaurantFind",
    //     title: "Restaurant List",
    //     path: "/findRestaurant",
    //     enabled: true,
    //     component: RestaurantFinder
    // }
    // ,
    {
        key: "route-about",
        title: "About",
        path: "/about",
        enabled: true,
        component: About
    },
    {
        key: "route-contactUs",
        title: "Contact Us",
        path: "/contactUs",
        enabled: true,
        component: ContactUs
    },
    // {
    //     key: "route-AdminAddMenu",
    //     title: "Admin Add Menu",
    //     path: "/adminAddMenu",
    //     enabled: true,
    //     component: AddMenuItem
    // },
    // {
    //     key: "route-RegisterUser",
    //     title: "User Registration",
    //     path: "/newUserRegister",
    //     enabled: true,
    //     component: RegisterUser
    // }

]

export default routes;