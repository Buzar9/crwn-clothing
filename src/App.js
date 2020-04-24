import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    // metoda potrzebna do zakończenia sesji równocześnie z momentem przestania użytkowania component App
    unsubscribeFromAuth = null;

    componentDidMount() {
        // Dopóki component App jest aktywny, doputy autoryzacja użytkownika jest otwarta i mamy dostęp do informacji o użytkowniku
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // this.setState({ currentUser: user });
            // console.log(user);

            //sprawdza czy obiekt userAuth nie jest nullem
            if(userAuth) {
              //  tworzy obiekt referencji z podanych userAuth
              const userRef = await createUserProfileDocument(userAuth);

              // gdy createUserProfileDocument() skopiuje dane użytkownika z logowania google do naszej bazy danych,
              //  następnie ustawia użytkownika jako zalogowanego w aplikacji
              userRef.onSnapshot(snapShot => {
                  //dopóki nie wywoła się .data() snapShot nie udostępni danych dokumentu
                  // console.log(snapShot.data());

                  this.setState({
                      currentUser: {
                          id: snapShot.id,
                          ...snapShot.data()
                      }
                      //    oczywiście this.setState jest asynchroniczne, więc, aby wykonać setState i console.log jednocześnie trzeba consol.log ująć jako osobną funkcję z osobnym
                      //    wywołaniem
                      // }, () => {
                      //     console.log(this.state)
                      // }
                  });
              //    dzięki zapisaniu obiektu w state, możemy nasłuchiwać zmian w tym obiekcie
              });
            //  jeżeli jednam userAuth jest nullem, aplikacja ustawia currentUser jako userAuth.
            } else {
                this.setState({currentUser: userAuth});
            }
        });
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
