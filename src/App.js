import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    // metoda potrzebna do zakończenia sekcji równocześnie z momentem przestania użytkowania component App
    unsubscribeFromAuth = null;

    componentDidMount() {
        // Dopóki component App jest aktywny, doputy autoryzacja użytkownika jest otwarta i mamy dostęp do informacji o użytkowniku
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });

            console.log(user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
      return (
        <div>
            <Header currentUser={this.state.currentUser}/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route path="/signin" component={SignInAndSignUpPage} />
            </Switch>
        </div>
      );
    }
}

export default App;
