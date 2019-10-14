export function dijkstra(grid, startNode, finishNode){
    const visitedNodes = [];
    let queue = priority_queue(grid);
    startNode.distance = 0;
    while(!!queue.length){
        //sort the nodes by distance as the priority queue normaly do this for you
        sortNodeByDistance(queue);
        let closestNode = queue.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;

        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === finishNode) return visitedNodes;
        updateUnvisitedNeighbors(closestNode, grid);

    }
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  

function priority_queue(grid){
    const nodes = [];
    for(const row of grid){
        for(const elem of row){
            nodes.push(elem);
        }
    }
    return nodes;
}

function sortNodeByDistance(queue){
    queue.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
