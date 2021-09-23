import HomePageConfigurator from "app/configurators/HomePageConfigurator";

const presenters = {
    homePresenter: HomePageConfigurator.instance().configureHomePagePresenter()
}
enum PresentersEnum {
    homePresenter = "homePresenter"
}
export {presenters,PresentersEnum}