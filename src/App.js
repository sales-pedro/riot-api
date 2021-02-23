import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";

import GamesList from "./components/GamesList";
import GamePage from "./components/GamePage";

export default function Home() {
  return (
    <div className="App bg-gray-100 min-h-screen mx-auto">
      <Header />
      <Router>
        <Route exact path="/" component={GamesList} />

        <Route exact path="/:linkDetails" component={GamePage} />
      </Router>
    </div>
  );
}
