import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from './components/header/header.component'

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
    //nie potrzebujemy konstruktora, ponieważ używamy reduxa i metody connect
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         currentUser: null
    //     }
    // }

    // metoda potrzebna do zakończenia sesji równocześnie z momentem przestania użytkowania component App
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                // zmiany dla zwiazane tylko z Reduxem. Zakomentowany blok poniżej pokazuje stan przed tymi zmianami.

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    // componentDidMount() {
    //     // Dopóki component App jest aktywny, doputy autoryzacja użytkownika jest otwarta i mamy dostęp do informacji o użytkowniku
    //     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //         // this.setState({ currentUser: user });
    //         // console.log(user);
    //
    //         //sprawdza czy obiekt userAuth nie jest nullem
    //         if(userAuth) {
    //           //  tworzy obiekt referencji z podanych userAuth
    //           const userRef = await createUserProfileDocument(userAuth);
    //
    //           // gdy createUserProfileDocument() skopiuje dane użytkownika z logowania google do naszej bazy danych,
    //           //  następnie ustawia użytkownika jako zalogowanego w aplikacji
     //           userRef.onSnapshot(snapShot => {
    //               //dopóki nie wywoła się .data() snapShot nie udostępni danych dokumentu
    //               // console.log(snapShot.data());
    //
    //               this.setState({
    //                   currentUser: {
    //                       id: snapShot.id,
    //                       ...snapShot.data()
    //                   }
    //                   //    oczywiście this.setState jest asynchroniczne, więc, aby wykonać setState i console.log jednocześnie trzeba consol.log ująć jako osobną funkcję z osobnym
    //                   //    wywołaniem
    //                   // }, () => {
    //                   //     console.log(this.state)
    //                   // }
    //               });
    //           //    dzięki zapisaniu obiektu w state, możemy nasłuchiwać zmian w tym obiekcie
    //           });
    //         //  jeżeli jednam userAuth jest nullem, aplikacja ustawia currentUser jako userAuth.
    //         } else {
    //             this.setState({currentUser: userAuth});
    //         }
    //     });
    // }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
      return (
        <div>
            {/* możemy usunąć ustawienie curentUser za pomocą this.state.currentUser, ponieważ używamy reduxa i header sam go pobiera z root-reducer*/}
            {/*<Header currentUser={this.state.currentUser}/>*/}
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path='/checkout' component={CheckoutPage} />
                <Route
                    exact
                    path="/signin"
                    render= {() =>
                        this.props.currentUser ? (
                            <Redirect to='/'/>
                        ) : (
                            <SignInAndSignUpPage/>
                        )
                    }
                />

            </Switch>
        </div>
      );
    }
}

// // mapuje root-reducer na propsy componentu Appact
// const mapStateToProps = ({ user }) => ({
//     currentUser: user.currentUser
// })

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser
});

//metoda, która obudowuje nam wysyłane dane w odpowiednią formę (obiekt z typem akcji/ tutaj z user.actions.js)
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
