<div align="center">
  <img alt="Subdivide Figma Plugin" src="media/subdivide_githeader.gif" height="240">
</div>

---
# Subdivide
Adds evenly spaced points along vector paths.

## Use
1. Select one or more shapes / paths and run the plugin.
2. Enter the number of points you'd like evenly inserted between each straight segment.
3. Hit OK.

## Installation
As of the latest release, I don't currently consider this utility "feature rich" enough to submit to the official Figma Plugin Community. However, it has been useful for me in a few edge cases, so I decided to release the package as an in-development plugin for right now. This just means you'll need to do a tiny bit of manual work to get it installed.

1. Download the latest release, unzip and save the folder to wherever you'd like to store the plugin.
2. In FIGMA, Right-Click the canvas and choose Plugins -> Development -> New Plugin
3. Choose "Link Existing Plugin" and point it to the "manifest.json" file within your saved plugin folder.

You can now use the plugin by Right-Clicking the canvas and choosing Plugins -> Development -> Subdivide.

## Known Limitations / Roadmap
- **Curves!** Does not currently support bezier paths / curves. It will evenly subdivide your path but the output will be connected by straight lines. It's an aesthetic 😂
- **Spacing!** Does not currently support custom spacing. It'd be ideal to allow for spacing as a % along the segment per individual point.
- If your path contains a straight segment with multiple points along it **and** your chosen point count is less than the amount of those currently existing, it will actually reduce (or simplify) the path down to your chosen point count.

## Local Development
I'm using the fantastic [Figma Plugin Boilerplate](https://github.com/thomas-lowry/figma-plugin-boilerplate) for development - I know it's a bit overkill for this utility at the moment, but it's a great way to remain consistent with the Figma UI Design System. Please refer to those [Getting Started](https://github.com/thomas-lowry/figma-plugin-boilerplate#getting-started) notes if you want to build using the same environment.
