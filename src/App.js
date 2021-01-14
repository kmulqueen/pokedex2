import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/pokemon/:id" component={DetailsPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
