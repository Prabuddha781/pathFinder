import animate from './animate';

const runDjikstras = (start, end, row, boardArray, obstacles, speed, weights, showAllNodes) => {
    var Heap = require('heap');
    var heap = new Heap(
        function(a,b){
            if (a[0] > b[0]){
                return 1
            }
            else if (a[0] == b[0]){
                if (a[1][1] <= b[1][1]){
                    return 1
                }  
            }
            else {
                return -1
            }
        }
    );

    let res = [];

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
            if (obstacles[xx][yy] == false && [xx, yy].toString() !== start.toString()){
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

    let minWeightSoFar = {}
    let idInitial = String(start[0]) + ',' + String(start[1])
    minWeightSoFar[idInitial] = weights[start[0]][start[1]]
    heap.push([Number(weights[start[0]][start[1]]), start, JSON.stringify([idInitial])])
    let curr, curr_weight, idName, curr_x, curr_y, new_x, new_y, path, i, dx, dy, new_weight;
    while (!heap.empty()){
        curr = heap.pop();
        curr_weight = Number(curr[0])
        curr_x = curr[1][0]
        curr_y = curr[1][1]
        path = JSON.parse(curr[2])
        res.push(String(curr_x)+","+String(curr_y))

        if ([curr_x, curr_y].toString() == end.toString()){
            animate(res, speed, path, showAllNodes, start, end);
            return;
        }

        for (i = 0; i < dir.length; i++){
            new_weight = curr_weight + weights
            dx = dir[i][0]
            dy = dir[i][1]
            new_x = curr_x + dx
            new_y = curr_y + dy
            idName =  String(new_x) + ',' + String(new_y)
            if (isValid(new_x, new_y)){
                if (!(idName in minWeightSoFar) || Number(minWeightSoFar[idName]) > Number(curr_weight) + Number(weights[new_x][new_y])){
                    path.push(idName)
                    minWeightSoFar[idName] = Number(curr_weight) + Number(weights[new_x][new_y])
                    heap.push([Number(curr_weight) + Number(weights[new_x][new_y]) + 1, [new_x, new_y], JSON.stringify(path)])
                    path.pop()
                }
            }
        }
    }
    animate(res, speed, [], showAllNodes, start, end);
    document.getElementById("noPath").innerHTML = "No path from start to end";
    document.getElementById("noPath").className += " mt-3 border border-rounded p-2"
    return;
}

export default runDjikstras;