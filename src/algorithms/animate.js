const animate = (colorArray, speed, shortestPath, showAllNodes, start, end) => {
    let incTime = 5;
    let startId = String(start[0])+","+String(start[1]);
    let endId = String(end[0])+","+String(end[1]);
    if (speed == "Medium"){
        incTime = 30;
    }
    else if(speed == "Slow"){
        incTime = 100;
    }
    else if(speed == "Fast"){
        incTime = 10;
    }
    else{
        incTime = 3;
    }
    let time = 5
    if (showAllNodes){
        for(let i = 0; i < colorArray.length; i++){
            setTimeout(() =>
            {   
            if (colorArray[i] !== startId && colorArray[i] !== endId ){
                document.getElementById(colorArray[i]).className = "spinner-grow text-danger bg-dark border";
                document.getElementById(colorArray[i]).role = "status";
                document.getElementById(colorArray[i]).innerHTML = '<span class="visually-hidden"></span>';
            }
            }, time
            )
            setTimeout(() =>
            {
                if (colorArray[i] !== startId && colorArray[i] !== endId ){
                    document.getElementById(colorArray[i]).className = "border bg-success"
                }
            }
            , time + 300)
            time += incTime;
        }    
    }
    for(let i = 0; i < shortestPath.length; i++){
        setTimeout(() =>
        {
            if (shortestPath[i] !== startId && shortestPath[i] !== endId ){
                document.getElementById(shortestPath[i]).className = "border bg-info"
            }
        } , time
        )
        time += 100;
    }
    document.getElementById("numOfNodesTraversed").innerHTML = "Num of nodes traversed:" + colorArray.length;
    document.getElementById("numOfNodesShortestPath").innerHTML = "Num of nodes in shortest path:" + shortestPath.length;
}

export default animate;