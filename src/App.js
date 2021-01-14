import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router basename="/">
      <Switch>
        {/* <Container> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pokemon/:id" component={DetailsPage} />
        {/* </Container> */}
      </Switch>
    </Router>
  );
}

export default App;
