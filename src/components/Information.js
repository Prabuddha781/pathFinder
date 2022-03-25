import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Information.module.css';
import { useState } from 'react';

const Information = ({ start, end, weights }) => {
    const [ showWeights, setShowWeights ] = useState(false);

    return (
        <main className={`${ classes.accordionStatistics } mt-4`}>
            <details className={`${ classes.borderCover }`}> 
                <summary>
                    Information
                </summary>
                <div className="d-flex flex-column">
                    <span className="me-3">Start X: { start ? start[0] : "Not selected" }</span>
                    <span className="me-3">Start Y: { start ? start[1] : "Not selected" }</span>
                    <span className="me-3">End X: { end ? end[0] : "Not selected" }</span>
                    <span className="me-3">End Y: { end ? end[1] : "Not selected" }</span>
                </div>
                <hr/>
                <div className="d-flex flex-row flex-wrap">
                    <div className="d-flex flex-column me-3"><div style={{ width:"30px", height:"30px" }} className="bg-secondary"></div>Start</div>
                    <div className="d-flex flex-column me-3"><div style={{ width:"30px", height:"30px" }} className="bg-primary"></div>End</div>
                    <div className="d-flex flex-column me-3"><div style={{ width:"30px", height:"30px" }} className="bg-success"></div>Visited</div>
                    <div className="d-flex flex-column me-3"><div style={{ width:"30px", height:"30px" }} className="bg-dark"></div>Frontier</div>
                    <div className="d-flex flex-column"><div style={{ width:"30px", height:"30px" }} className="bg-info"></div>Shortest Path</div>
                </div>
                <hr/>
                <div id="numOfNodesTraversed">Num of nodes traversed: </div>
                <div id="numOfNodesShortestPath">Num of nodes in shortest path: </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    <button id="showWeights" className="showWeights" onClick={ () => setShowWeights((prevState) => !prevState) }> { showWeights ? "Hide weights" : "Show Weights"} </button>
                </div>
                { showWeights && weights.map((row, r) => <div className="d-flex flex-wrap">row:&nbsp;{r + "=>"}{ row.map((col, c) => <span>{ col },&nbsp;</span>) }</div>) }
            </details>
        </main>
    )
}




export default Information;