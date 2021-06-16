import React from 'react';
import HomePage from "./modules/scenes/HomePage/HomePage";
import HomePageConfigurator from './modules/scenes/HomePage/HomePageConfigurator';
export default function App() {
   return <HomePage presenter = {HomePageConfigurator.configureHomePagePresenter()} />
}

