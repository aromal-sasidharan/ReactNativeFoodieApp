import HomePageConfigurator from "app/configurators/HomePageConfigurator";
import React from "react";
import AbstractHomePagePresenter from "app/domain/UseCases/HomePage/HomePageUseCase";


const HomePagePresenterContext = React.createContext<AbstractHomePagePresenter | null>(null)
const homePagePresenter = HomePageConfigurator.instance().presenter()
export {
    homePagePresenter,
    HomePagePresenterContext
}