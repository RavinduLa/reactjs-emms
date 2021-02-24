//import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import {Container, Row, Jumbotron, Col} from 'react-bootstrap';
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";
import Header from "./components/Header";

function App() {

  return (
    <Router >

        <Header />
        <NavigationBar />
        <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/inventory" exact component={Inventory} />
        </Switch>

        {/*<Container>
            <Row>
                <Col>
                    <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/inventory" exact component={Inventory} />
                    </Switch>
                </Col>
            </Row>
        </Container>*/}

        <Footer />

    </Router>
  );
}

export default App;
