figma.showUI(__html__, { width: 300, height: 90 });
// divides length of two points into # of even distances
// returns Point array with those pairs
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
        // checks to see if at least 1 element is selected
        if (figma.currentPage.selection.length <= 0) {
            figma.ui.postMessage(1001); // sends code 1001 to HTML UI
            return;
        }
        else {
            // loops through individual selection elements
            for (const node of figma.currentPage.selection) {
                const currentNode = figma.flatten([node]); // flattens the shape into a vector path so we can access vertices
                const segmentPoints = msg.count + 1;
                let allPoints = [];
                // loops through each individual segment in our vector path
                currentNode.vectorNetwork.segments.forEach(segment => {
                    // grabs vertice data
                    const start = currentNode.vectorNetwork.vertices[segment.start];
                    const end = currentNode.vectorNetwork.vertices[segment.end];
                    const startPoint = { x: start.x, y: start.y };
                    const endPoint = { x: end.x, y: end.y };
                    // push first point to new Point array
                    allPoints.push(startPoint);
                    // calc new middle points & push to Point array
                    const midPoints = midDistances(startPoint, endPoint, segmentPoints);
                    for (var mps = 0; mps < msg.count; mps++) {
                        allPoints.push(midPoints[mps]);
                    }
                    // push last point in segment to Point Array
                    allPoints.push(endPoint);
                });
                // iterates through Point array and write out the SVG Data
                let svg = "M " + allPoints[0].x + " " + allPoints[0].y + " "; // defines first "move to" starting pos
                for (var i = 0; i < allPoints.length - 1; i++) {
                    svg += "L " + allPoints[i + 1].x + " " + allPoints[i + 1].y + " ";
                }
                // defines new path data with exsiting windingrule
                const path = {
                    windingRule: currentNode.vectorPaths[0].windingRule,
                    data: svg.trimRight() // removes any trailing whitespace, does not modify string
                };
                // sets new path data to our selected node
                currentNode.vectorPaths = [path];
                // bye, bye
                figma.closePlugin();
            }
        }
    }
};
