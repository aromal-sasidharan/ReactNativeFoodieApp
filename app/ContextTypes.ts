import {AbstractHomePageStore} from "app/stores/HomePageStore";
import React from "react";

interface IHomePageContext {
    mainStore?: AbstractHomePageStore
}

const HomePageContext = React.createContext<IHomePageContext | undefined>(undefined)


export {
    HomePageContext,
    IHomePageContext
}




