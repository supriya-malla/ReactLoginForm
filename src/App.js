import './App.css'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import LoginForm from './containers/LoginForm'
import ForgotPassword from './containers/ForgotPassword'

function App() {
  return (
    <BrowserRouter basename='/ReactLoginForm'>
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/forgot_password' component={ForgotPassword} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
