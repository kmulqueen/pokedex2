import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router basename="/">
      <Container>
        <Switch>
          <Route exact path="/pokemon/:id" component={DetailsPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
