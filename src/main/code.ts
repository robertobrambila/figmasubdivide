figma.showUI(__html__, { width: 300, height: 90 });

interface Point {
	x: number;
	y: number;
}

// find a point at t (0 <= t <= 1) between two given points
function lerp(a: Point, b: Point, t: number): Point {
	return {
	  x: (b.x - a.x) * t + a.x,
	  y: (b.y - a.y) * t + a.y
	};
  }
  
  // divides length of a segment (two points) into # of even distances
  // returns Point array with those pairs
  function divideSegment(a: Point, b: Point, c: number): Point[] {
	const l = 1 / (c+1) // length along the segment
	let points = [];
  
	for (var i = l; i < 1 ; i += l) { // incr count by length until we get to 1
	  points.push(
		lerp(a, b, i) // i = point in time to sample
	  ); 
	  
	}
	
	  return points;
  }

async function loadSettings() {
	//
	let savedDivisions = await figma.clientStorage.getAsync('divisions');
	if (!savedDivisions) {
		console.log('Settings not saved.')
	} else {
		figma.ui.postMessage({divisionCount: savedDivisions}); // sends code 1001 to HTML UI
		console.log("Saved Divisions: " + savedDivisions)
	}
}

loadSettings().then(() => {
	figma.ui.onmessage = async(msg) => {

		if (msg.type === 'subdivide-path') {

			// checks to see if at least 1 element is selected
			if (figma.currentPage.selection.length <= 0) {
				figma.ui.postMessage(1001); // sends code 1001 to HTML UI
				return
			}
			else {
				// loops through individual selection elements
				for (const node of figma.currentPage.selection) {
					const currentNode = figma.flatten([node]); // flattens the shape into a vector path so we can access vertices

					let allPoints: Point[] = [];

					// loops through each individual segment in our vector path
					currentNode.vectorNetwork.segments.forEach(segment => {
						// grabs vertice data
						const start = currentNode.vectorNetwork.vertices[segment.start];
						const end = currentNode.vectorNetwork.vertices[segment.end];
						const startPoint = { x: start.x, y: start.y };
						const endPoint = { x: end.x, y: end.y };

						// push first point to new Point array
						allPoints.push(startPoint)

						// calc new middle points & push to Point array
						const midPoints = divideSegment(startPoint, endPoint, msg.divisionCount);
						for (var mps = 0; mps < msg.divisionCount; mps++) {
							allPoints.push(midPoints[mps]);
						}

						// push last point in segment to Point Array
						allPoints.push(endPoint)
					});

					// iterates through Point array and write out the SVG Data
					let svg = "M " + allPoints[0].x + " " + allPoints[0].y + " "; // defines first "move to" starting pos
					for (var i = 0; i < allPoints.length - 1; i++) {
						svg += "L " + allPoints[i + 1].x + " " + allPoints[i + 1].y + " ";
					}


					// defines new path data with exsiting windingrule
					const path: VectorPath = {
						windingRule: currentNode.vectorPaths[0].windingRule,
						data: svg.trimRight() // removes any trailing whitespace, does not modify string
					}

					// sets new path data to our selected node
					currentNode.vectorPaths = [path];

					// save count to local settings
					await figma.clientStorage.setAsync('divisions', msg.divisionCount);

					// bye, bye
					figma.closePlugin();
				}
			}
		}
	}
});