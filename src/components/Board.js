import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Board.module.css';

import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SideNavigation from './SideNavigation';
import Instructions from './Instructions';
import Information from './Information';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Board = ({ row, setRow, obstacles, weights, randomNum }) => {
    const query = useQuery();
    const newRow = query.get('row') || 10;

    useEffect(() => {
        setRow(newRow);
    }, [newRow])

    let r;
    let c;
    let idName;
    let boardArray = [];
    for (r = 0; r < row; r++){
        let rowArray =[]
        for (c = 0; c < row; c++){
            idName = String(r) + "," + String(c);
            rowArray.push(idName);
        }
        boardArray.push(rowArray);
    }

    const [ width, setWidth ] = useState(window.innerWidth);
    const [ height, setHeight ] = useState(window.innerHeight)

    let actualSize = 0.75 * Math.min(width, height);
    let actualWidth = actualSize/row;
    let actualHeight = actualSize/row;

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
    }
        window.addEventListener('resize', handleResize)
        }
    )

    const [ startFound, setStartFound ] = useState(false);
    const [ endFound, setEndFound ] = useState(false);
    const [ start, setStart ] = useState([]);
    const [ end, setEnd ] = useState([]);

    const handleNodeClick = (e) => {
        let coor = e.split(',');
        let pos = [Number(coor[0]), Number(coor[1])];
        if (!startFound){
            if (pos.toString() === end.toString()){
                setEndFound(false);
                setEnd([]);
                let allClasses = document.getElementById(e).className.split(' ');
                let modClasses = allClasses.filter(each => each !== "bg-primary");
                document.getElementById(e).className = modClasses.join(" ");
            }
            setStartFound(true);
            setStart(pos);
            document.getElementById(e).className += " bg-secondary";
        }
        else if (startFound && start.toString() === pos.toString()){
            setStartFound(false);
            setStart([])
            let allClasses = document.getElementById(e).className.split(' ');
            let modClasses = allClasses.filter(each => each !== "bg-secondary");
            document.getElementById(e).className = modClasses.join(" ");
        }
        else if (!endFound){
            setEndFound(true);
            setEnd(pos);
            document.getElementById(e).className += " bg-primary";
        }
        else if (endFound && end.toString() === pos.toString()){
            setEndFound(false);
            setEnd([]);
            let allClasses = document.getElementById(e).className.split(' ');
            let modClasses = allClasses.filter(each => each !== "bg-primary");
            document.getElementById(e).className = modClasses.join(" ");
        }
    }

    const [ disableState, setDisableState ] = useState(true);
    const [ obstacleState, setObstacleState ] = useState(false);
    const [ speed, setSpeed ] = useState("Medium")
    
    useEffect(() => {
        if (startFound && endFound){
            setDisableState(false);
        }
        else{
            setDisableState(true);
        }
    }
    ,[endFound, startFound])

    const addObstacle = (e) => {
        if (obstacleState === true){
            let pos = e.split(",");
            obstacles[Number(pos[0])][Number(pos[1])] = true;
            document.getElementById(e).className += " bg-warning";
        }
    }

    const [ addWeight, setAddWeight ] = useState(false);

    var enterTime, exitTime, timeSpent;
    const handleMouseEnter = (e) => {
        if(addWeight === true){
            enterTime = new Date();
        }
    }

    const handleMouseLeave = (e) => {
        if(addWeight === true){
            exitTime = new Date();
            timeSpent = exitTime - enterTime;
            let pos = e.split(",");
            let colorCode = 139 - Math.min(timeSpent+weights[Number(pos[0])][Number(pos[1])], 1000)/7.2;
            weights[Number(pos[0])][Number(pos[1])] += timeSpent;
            document.getElementById(e).style.backgroundColor = `rgb(${colorCode},0,0)`;
        }
    }

    const [ showAllNodes, setShowAllNodes ] = useState(true);

    return (
        <main>
            < NavBar start={ start } end={ end } actualWidth={Math.min(Math.max(actualWidth, 20), 40)} actualHeight={Math.min(Math.max(actualHeight, 20), 40)} setRow={ setRow } setSpeed={ setSpeed } setShowAllNodes={ setShowAllNodes }  addWeight={ addWeight } endFound={ endFound } startFound={ startFound }/>
            <section className={`${ classes.displayBoardAndSidebar }`}>
                <div className={`d-flex ${ classes.boardContainer } ms-auto flex-column mb-auto mt-5 align-items-center`}>
                    { 
                        boardArray.map((each, i) =>
                        <div key={i} className="d-flex">
                        { each.map(e => <span id={e} className="border" style={{ width:`${actualWidth}px`, height:`${actualHeight}px`, backgroundColor: "rgb(255,255,255)" }} key={e} onClick={ () => handleNodeClick(e) } onMouseOver={ () => addObstacle(e) } onMouseEnter={ ()=> handleMouseEnter(e) } onMouseLeave={ () => handleMouseLeave(e) }/>) 
                        }
                        </div>
                        )
                    }
                <div id="noPath" className="h3 text-danger"/>
                <div>
                    <Information start={ start } end={ end } weights={ weights }/>
                </div>
                </div>
                <div className="ms-auto me-auto">
                <SideNavigation disableState={ disableState } setDisableState={ setDisableState } start={ start } end={ end } row={ row } boardArray={boardArray} setObstacleState={ setObstacleState } obstacles={ obstacles } speed={ speed } setAddWeight={ setAddWeight } weights={ weights } showAllNodes={ showAllNodes } />
                <Instructions startFound={ startFound } endFound={ endFound } addWeight={ addWeight } obstacleState={ obstacleState } />
                </div>
            </section>
        </main>
    )
}

export default Board;