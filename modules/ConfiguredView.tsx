
import React from "react"
import HomePageConfigurator from "./configurators/HomePageConfigurator"
import HomePage from "./scenes/HomePage/HomePage"

class ConfiguredView {
    static homePage = <HomePage presenter={HomePageConfigurator.instance().configureHomePagePresenter()}/>
}
export default ConfiguredView