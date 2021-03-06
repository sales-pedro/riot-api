import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./components/Header";

import GamesList from "./components/GamesList";
import GamePage from "./components/GamePage";

import "./firebase/config";
import { UserProvider } from "./firebase/UserProvider";
import Login from "./pages/Login";
import AuthRoute from "./router/AuthRoute";
import LoginRoute from "./router/LoginRoute";
import Test from "./components/Test";

export default function Home() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App bg-gray-700 min-h-screen mx-auto text-gray-300">
          <Header />
          <Switch>
            <AuthRoute exact path="/" component={GamesList} />
            <AuthRoute exact path="/test/:linkDetails" component={Test} />
            <LoginRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/:linkDetails" component={GamePage} />
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
