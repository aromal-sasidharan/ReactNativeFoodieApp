
import React from "react"
import HomePageConfigurator from "./configurators/HomePageConfigurator"
import HomePage from "./scenes/HomePage/HomePage"

class ConfiguredView {
    static home () {
        return <HomePage presenter={HomePageConfigurator.instance().configureHomePagePresenter()}/>
    }
}
export default ConfiguredView