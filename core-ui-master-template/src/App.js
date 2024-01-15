import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import { api } from './plugins/api';
import Login from './views/atmaQA/loginForm';
// import Register from './components/Register';
import Dashboard from './views/atmaQA/dashboardAtma';
import './scss/style.scss';

const TheLayout = React.lazy(() => import('./containers/TheLayout'));

function App() {

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loadingUserInformation, setLoadingUserInformation] = useState(true);
  // const history = useHistory();

  // console.log(user);

  useEffect(() => {
    // console.log('AHDKALDASLDLJ')
    const token = localStorage.getItem('token');

    if (token) {
      api
        .get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response)
          setUser(response.data);
          // setUser(response.data);
          setAuth(true);
          setLoadingUserInformation(false);
        })
        .catch((error) => {
          console.log(error)
          // localStorage.removeItem('token');
        });
    } else {
      setLoadingUserInformation(false);
    }
  }, []);

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  // const role = localStorage.getItem('role')

  return (
    <BrowserRouter>
      {loadingUserInformation ?
        loading
        : auth ?
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/dashboard-atma">
                <Dashboard user={user} setAuth={setAuth} />
              </Route>
              <Route path="/" render={props => <TheLayout {...props} />} />
              {/* {
                role == "admin"
                  ?
                  <Route path="/" render={props => <TheLayout {...props} />} />
                  :
                  (
                    role == "dosen"
                      ?
                      < Route path="/lecturer-class/lecturer-class-list" render={props => <TheLayout {...props} />} />
                      :
                      < Route path="/class/class-select" render={props => <TheLayout {...props} />} />
                  )
              } */}
            </Switch>
          </React.Suspense>
          : <Login />}
    </BrowserRouter>
  );
}

export default App;

