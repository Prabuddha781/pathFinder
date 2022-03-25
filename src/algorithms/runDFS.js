import animate from './animate';

const runDFS = (start, end, row, boardArray, obstacles, speed, showAllNodes) => {
    let stack = [];
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
            if (visited[xx][yy] == false && obstacles[xx][yy] == false && [xx, yy].toString() !== start.toString()){
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
    stack.push(start)

    while (stack.length > 0){
        let i, coor, x, y, dx, dy, idName, new_x, new_y, path;
        coor = stack.pop();
        x = coor[0];
        y = coor[1];

        for (i = 0; i < dir.length; i++)
        {   
            dx = dir[i][0];
            dy = dir[i][1];
            new_x = x + dx;
            new_y = y + dy;
            idName = String(new_x) + "," + String(new_y);

            if (isValid(new_x, new_y)){
                if ([new_x, new_y].toString() == end.toString()){
                    animate(res, speed, res, showAllNodes, start, end);
                    return;
                }
                stack.push([new_x, new_y]);
                visited[new_x][new_y] = true;
                res.push(idName);
            }
        }
    }
    animate(res,speed,res, showAllNodes, start, end);
    document.getElementById("noPath").innerHTML = "No path from start to end";
    document.getElementById("noPath").className += " mt-3 border border-rounded p-2"
    return;
}

export default runDFS;