import { Queue } from './Queue';
import animate from './animate';

const runBFS = (start, end, row, boardArray, obstacles, speed, showAllNodes) => {
    let dq = new Queue();
    let visited = [];
    let r, c;

    for (r = 0; r < row; r++){
        let temp = [];
        for (c = 0; c < row; c++){
            temp.push(false);
        }
        visited.push(temp);
    }

    const isValid = (xx, yy) => {
        if (xx >= 0 && yy >= 0 && xx < row && yy < row){
            if (visited[xx][yy] == false && obstacles[xx][yy] == false){
                return true;
            }
        }
        return false;
    }

    let dir = [];
    dir.push([0,1])
    dir.push([1, 0])
    dir.push([0,-1])
    dir.push([-1,0])

    let res = [];
    dq.enqueue([start, JSON.stringify([String(start[0] + "," + String(start[1]))])])

    while (!dq.isEmpty()){
        let i, coor, x, y, dx, dy, idName, new_x, new_y, path;
        coor = dq.dequeue();
        x = coor[0][0];
        y = coor[0][1];
        path = JSON.parse(coor[1]);

        for (i = 0; i < dir.length; i++)
        {   
            dx = dir[i][0];
            dy = dir[i][1];
            new_x = x + dx;
            new_y = y + dy;
            idName = String(new_x) + "," + String(new_y);

            if (isValid(new_x, new_y)){
                path.push(idName);
                res.push(idName);
                if ([new_x, new_y].toString() == end.toString()){
                    animate(res, speed, path, showAllNodes, start, end);
                    return;
                }
                dq.enqueue([[new_x, new_y], JSON.stringify(path)]);
                path.pop();
                visited[new_x][new_y] = true;
            }
        }
    }
    animate(res,speed,[], showAllNodes, start, end);
    document.getElementById("noPath").innerHTML = "No path from start to end";
    document.getElementById("noPath").className += " mt-3 border border-rounded p-2"
    return;
}

export default runBFS;