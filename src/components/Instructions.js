import 'bootstrap/dist/css/bootstrap.min.css';

import classes from './Instructions.module.css';

const Instructions = ({ startFound, endFound, addWeight, obstacleState }) => {
    return (
        <main>
        <fieldset className="border ms-2 me-2 mb-3">
            <legend  className={`${ classes.legendStyle } w-auto ms-4`}>Instructions</legend>
            <ul>
            { !startFound && <li>Click a box in the maze for the starting position.</li> }
            { !endFound && <li>Click a box in the maze for the ending position.</li> }
            <li>Optional: Add weights and obstacles.</li>
            <li>Choose an algorithm to your liking.</li>
            </ul>
        </fieldset>
        </main>
    )
}

export default Instructions;