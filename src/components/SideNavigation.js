import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import classes from './SideNavigation.module.css';
import runBFS from '../algorithms/runBFS';
import runDFS from '../algorithms/runDFS';
import runBiBFS from '../algorithms/runBiBFS';
import runDjikstras from '../algorithms/runDjikstras';

const SideNavigation = ({ disableState, setDisableState, start, end, row, boardArray, setObstacleState, obstacles, speed, setAddWeight, weights, showAllNodes }) => {
    const navigate = useNavigate();
    const addObstacles = () => {
        setAddWeight(false);
        setObstacleState(prevState => !prevState);
    }

    const callBFS = () => {
        runBFS(start, end, row, boardArray, obstacles, speed, showAllNodes);
        setDisableState(prevState => !prevState);
    }

    const callDFS = () => {
        runDFS(start, end, row, boardArray, obstacles, speed, showAllNodes);
        setDisableState(prevState => !prevState)
    }

    const callBiBFS = () => {
        runBiBFS(start, end, row, boardArray, obstacles, speed, showAllNodes)
        setDisableState(prevState => !prevState)
    }

    const handleAddWeight = () => {
        setObstacleState(false);
        setAddWeight(prevState => !prevState);
    }

    const callDjikstras = () => {
        runDjikstras(start, end, row, boardArray, obstacles, speed, weights, showAllNodes)
        setDisableState(prevState => !prevState)
    }

    const pageRefresh = () => {
        navigate(`/?row=${row}`)
        window.location.reload(false);
    }

    return (
        <div className={`d-flex flex-column mt-5 ${ classes.SideNavMarginBottom }`}>
            <fieldset className="border ms-2 me-2 mb-3">
                <legend  className={`${ classes.legendStyle } w-auto ms-4`}>Algorithms</legend>
                <div className="d-flex flex-row flex-wrap mb-3 ms-3">
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ callBFS } disabled={ disableState }>Run BFS</button>
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ callDFS } disabled={ disableState }>Run DFS</button>
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ callBiBFS } disabled={ disableState }>Run Bidirectional-BFS</button>
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ callDjikstras } disabled={ disableState }>Djikstras</button>
                </div>
                { disableState && <span className={`${ classes.instructionFS } fst-italic ms-3 text-muted`}>Select starting and ending positions to enable buttons.</span> }
            </fieldset>
            <fieldset className="border ms-2 me-2 mb-3">
                <legend  className={`${ classes.legendStyle } w-auto ms-4`}>Reset</legend>
                <div className="d-flex flex-row mb-3 ms-3">
                    <button className={`${ classes.button10 } me-md-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ () => pageRefresh() } disabled={ !disableState }>Reset</button>
                </div>
            </fieldset>
            <fieldset className="border ms-2 me-2 mb-3">
                <legend  className={`${ classes.legendStyle } w-auto ms-4`}>Add weight and obstacles</legend>
                <div className="d-flex flex-row mb-3 ms-3">
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ () => addObstacles() } disabled={ disableState }>Add Obstacles</button>
                    <button className={`${ classes.button10 } me-3 mb-md-0 mb-2 mt-md-0 mt-2 align-self-center`} onClick={ () => handleAddWeight() } disabled={ disableState }>Add weight</button>
                </div>
                { disableState && <div className={`${ classes.instructionFS } fst-italic ms-3 text-muted`}>Select starting and ending positions to enable buttons. Hover over the board to add the obstacles and weights. The longer you hover, the more weight it has.</div> }
            </fieldset>
        </div>
    )
    }

export default SideNavigation;