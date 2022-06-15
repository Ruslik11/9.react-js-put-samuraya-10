import React from "react";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";

import NavBar from "./components/NavBar/NavBar";
import './App.css'
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/store";
import {WithSuspense} from "./hoc/WithSuspense";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert("Some error occured");
        // console.error(promiseRejectionEvent)
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) return <Preloader />;

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <NavBar />
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/profile' />} />
                        <Route path='/dialogs' render={WithSuspense(DialogsContainer)} />
                        <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)} />
                        <Route path='/users' render={() => <UsersContainer />} />
                        <Route path='/login' render={() => <LoginPage />} />
                        <Route path='*' render={() => <div>404 Page</div>} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   initialized: state.app.initialized
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

let SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
};

export default SamuraiJSApp;