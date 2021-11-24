import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { Switch, Route } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <LoginPage />} />
        <Route path="/userpage" render={() => <UserPage />} />
      </Switch>
    </>
  );
}

export default App;
