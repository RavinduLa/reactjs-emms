//import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

//import {Container, Row, Jumbotron, Col} from 'react-bootstrap';
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";
import Header from "./components/Header";
import AddInventory from "./components/AddInventory";
import SingleEquipment from "./components/SingleEquipment";
import Maintenance from "./components/Maintenance";
import AddJob from "./components/AddJob";
import Dashboard from "./components/Dashboard";
import EditEquipment from "./components/EditEquipment";

function App() {

  return (
    <Router >

        <Header />
        <NavigationBar />
        <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/inventory" exact component={Inventory} />
            <Route path="/addInventory" exact component={AddInventory} />
            <Route path="/singleEquipment" exact component={SingleEquipment} />
            <Route path="/maintenance" exact component={Maintenance} />
            <Route path="/addNewJob" exact component={AddJob} />
            <Route path="/dashboard-admin" exact component={Dashboard} />
            <Route path="/updateEquipment" exact component={EditEquipment} />
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
