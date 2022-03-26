import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './NavBar.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const NavBar = ({ setRow, setSpeed, setShowAllNodes }) => {

    let countOneToHundred = [];
    let i;
    for (i = 2; i < 101; i++){
        countOneToHundred.push(i);
    }

    const setValue = (e) => {
        e.preventDefault();
        setRow(document.getElementById("numRows").value);
    }

    const handleSpeed = () => {
        setSpeed(document.getElementById("speed").value);
    }

    const handleAllNodes = () => {
        if (document.getElementById("showAllNodes").value == "yes"){
            setShowAllNodes(true);
        }
        else {
            setShowAllNodes(false);
        }
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <button className={`${ classes.button11 } bg-light`} onClick={ () => window.location.reload(false) }>PATH FINDER</button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <div className="d-flex flex-column me-3 mb-lg-0 mb-3 mt-lg-0 mt-3">
                <select id="numRows" onChange={ setValue } className={`${ classes.selectBox } form-select form-select-sm ps-3`} aria-label="Select rows">
                    <option value="25" defaultValue>Num of rows</option>
                    { countOneToHundred.map((each, i) => <option key={i} value={`${ each }`}>{ each }</option> ) }
                </select>
            </div>
            <div className="d-flex flex-column me-3 mb-lg-0 mb-3">
                <select id="speed" onChange={ handleSpeed } className={`${ classes.selectBox } form-select form-select-sm ps-3`} aria-label="Select speed">
                    <option value="Medium" defaultValue>Speed of traversal</option>
                    <option value="Medium">Medium</option>
                    <option value="Slow">Slow</option>
                    <option value="Fast">Fast</option>
                    <option value="ultraFast">Don't want to wait</option>
                </select>
            </div>
            <div className="d-flex flex-column me-3">
                <select id="showAllNodes" onChange={ handleAllNodes } className={`${ classes.selectBox } form-select form-select-sm ps-3`} aria-label="Show all nodes">
                    <option value="yes" defaultValue>Show all visited nodes?</option>
                    <option value="yes" defaultValue>Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
    }

export default NavBar;