<div align="center">
  <img alt="Subdivide Figma Plugin" src="">
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

## Known Limitations
- Does not currently support bezier paths / curves. It will evenly subdivide your path but the output will be connected by straight lines. It's an aesthetic 😂
- If your path contains a straight segment with multiple points along it **and** your chosen point count is less than the amount of those currently existing, it will actually reduce (or simplify) the path down to your chosen point count.

## Local Development
I'm using the fantastic [Figma Plugin Boilerplate](https://github.com/thomas-lowry/figma-plugin-boilerplate) for development - I know it's a bit overkill for this utility at the moment, but it's a great way to remain consistent with the Figma UI Design System. Please refer to those [Getting Started](https://github.com/thomas-lowry/figma-plugin-boilerplate#getting-started) notes if you want to build using the same environment.
