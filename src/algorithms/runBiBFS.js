import { Queue } from './Queue';
import animate from './animate';

const runBiBFS = (start, end, row, boardArray, obstacles, speed, showAllNodes) => {
    let dq1 = new Queue();
    let visited1 = [];
    let r, c;

    for (r = 0; r < row; r++){
        let temp = new Array();
        for (c = 0; c < row; c++){
            temp.push(false);
        }
        visited1.push(temp);
    }

    let dq2 = new Queue();
    let visited2 = [];

    for (r = 0; r < row; r++){
        let temp = new Array();
        for (c = 0; c < row; c++){
            temp.push(false);
        }
        visited2.push(temp);
    }

    const isValid1 = (xx, yy) => {
        if (xx >= 0 && yy >= 0 && xx < row && yy < row){
            if (visited1[xx][yy] == false && obstacles[xx][yy] == false && [xx, yy].toString() !== start.toString()){
                return true;
            }
        }
        return false;
    }

    const isValid2 = (xx, yy) => {
        if (xx >= 0 && yy >= 0 && xx < row && yy < row){
            if (visited2[xx][yy] == false && obstacles[xx][yy] == false && [xx, yy].toString() !== end.toString()){
                return true;
            }
        }
        return false;
    }

    let dir = new Array();
    dir.push([0,1])
    dir.push([1, 0])
    dir.push([0,-1])
    dir.push([-1,0])

    let res = [];
    const pathStore1 = {};
    const pathStore2 = {};
    dq1.enqueue([start, JSON.stringify([String(start[0] + "," + String(start[1]))])])
    dq2.enqueue([end, JSON.stringify([String(end[0] + "," + String(end[1]))])])

    while (!dq1.isEmpty() && !dq2.isEmpty()){
        let i, coor1, x1, y1, dx, dy, idName1, new_x1, new_y1, path1;
        let coor2, x2, y2, idName2, new_x2, new_y2, path2;
        coor1 = dq1.dequeue();
        x1 = coor1[0][0];
        y1 = coor1[0][1];
        path1 = JSON.parse(coor1[1]);

        coor2 = dq2.dequeue();
        x2 = coor2[0][0];
        y2 = coor2[0][1];
        path2 = JSON.parse(coor2[1]);

        for (i = 0; i < dir.length; i++)
        {   
            dx = dir[i][0];
            dy = dir[i][1];
            new_x1 = x1 + dx;
            new_y1 = y1 + dy;
            idName1 = String(new_x1) + "," + String(new_y1);

            new_x2 = x2 + dx;
            new_y2 = y2 + dy;
            idName2 = String(new_x2) + "," + String(new_y2);

            if (isValid1(new_x1, new_y1)){
                if (visited2[new_x1][new_y1]){
                    animate(res, speed, path1.concat(JSON.parse(pathStore2[idName1])), showAllNodes, start, end);
                    return;
                }
                path1.push(idName1);
                pathStore1[idName1] = JSON.stringify(path1);
                dq1.enqueue([[new_x1, new_y1], JSON.stringify(path1)]);
                path1.pop();
                visited1[new_x1][new_y1] = true;
                res.push(idName1);
            }

            if (isValid2(new_x2, new_y2)){
                if (visited1[new_x2][new_y2]){
                    animate(res, speed, path2.concat(JSON.parse(pathStore1[idName2])), showAllNodes, start, end);
                    return;
                }
                path2.push(idName2);
                pathStore2[idName2] = JSON.stringify(path2);
                dq2.enqueue([[new_x2, new_y2], JSON.stringify(path2)]);
                path2.pop();
                visited2[new_x2][new_y2] = true;
                res.push(idName2);
            }
        }
    }
    animate(res,speed,[], showAllNodes, start, end);
    document.getElementById("noPath").innerHTML = "No path from start to end";
    document.getElementById("noPath").className += " mt-3 border border-rounded p-2"
    return;
}

export default runBiBFS;