figma.showUI(__html__, { width: 300, height: 90 });
function midDistances(a, b, count) {
    var xDist = (b.x - a.x) / count;
    var yDist = (b.y - a.y) / count;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    var newPoints = [];
    for (var i = 0; i < count - 1; i++) {
        newPoints.push({
            x: a.x + xDist * (i + 1),
            y: a.y + yDist * (i + 1)
        });
    }
    return newPoints;
}
figma.ui.onmessage = msg => {
    if (msg.type === 'subdivide-path') {
        if (figma.currentPage.selection.length <= 0) {
            figma.ui.postMessage(1001); // send code 1001 to HTML UI
            console.log('Please select a valid path.');
            return;
        }
        else {
            for (const node of figma.currentPage.selection) {
                const currentNode = figma.flatten([node]);
                const segmentPoints = msg.count + 1;
                let allPoints = [];
                currentNode.vectorNetwork.segments.forEach(segment => {
                    const start = currentNode.vectorNetwork.vertices[segment.start];
                    const end = currentNode.vectorNetwork.vertices[segment.end];
                    const startPoint = { x: start.x, y: start.y };
                    const endPoint = { x: end.x, y: end.y };
                    allPoints.push(startPoint);
                    const midPoints = midDistances(startPoint, endPoint, segmentPoints);
                    for (var mps = 0; mps < msg.count; mps++) {
                        allPoints.push(midPoints[mps]);
                    }
                    allPoints.push(endPoint);
                });
                // iterate through allPoints and write out the SVG Data
                let svg = "M " + allPoints[0].x + " " + allPoints[0].y + " "; // move to first point pos
                for (var i = 0; i < allPoints.length - 1; i++) {
                    svg += "L " + allPoints[i + 1].x + " " + allPoints[i + 1].y;
                    // add trailing space if its not the last point in the array
                    if (i != (allPoints.length - 2)) { // not including the first point pos
                        svg += " ";
                    }
                }
                const path = {
                    windingRule: currentNode.vectorPaths[0].windingRule,
                    data: svg
                };
                //  console.log(path)
                currentNode.vectorPaths = [path];
                figma.closePlugin();
            }
        }
    }
};
