# Description

A small tool to help visualize node module dependencies for a project. It analyzes package-lock.json to produce a dependency graph (out.dot) which can then be interpreted directly or transformed into image / SVG using tools like graphviz (out.svg).

# Installation

1. `npm isntall`
2. `npm link`
3. install graphviz for visualizing results. Ex: `brew install graphviz`

# Execute

`node-modules-analyzer <path-to-package-lock-json-file>`

# Results

Check out out.dot and out.svg inside root folder
