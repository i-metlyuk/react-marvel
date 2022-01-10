import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            >
                            <MainPage></MainPage>
                        </Route>
                        
                        <Route
                            exact
                            path="/comics"
                            >
                            <ComicsPage></ComicsPage>
                        </Route>

                        <Route
                            path='/comics/:comicId'
                            >
                            <SingleComicPage></SingleComicPage>
                        </Route>

                        <Route
                            exact
                            path="*"
                            >
                            <Page404></Page404>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;