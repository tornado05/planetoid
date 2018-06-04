# Planetoid

## Description

This is a library of modeling planets using d3 and topojson. The main point is to use es6 syntax and to be able to import it into project.
##### NOTE: version < 0.1.x is under development so please do not use it. 

## Requirments

This project requires `node >= 8.0.x` to build it.

## Plugins

### dataloader

Plugin loads json data and stores it under the key

#### Constructor options:
 - dataRequests - list of objects `{url: <url>, key: <data key>}`

Data can be accessed to from any plugin using code `this.getData(<data key>)`

### globe 

Plugin draws basic Sphere and color. Graticule can be added to sphere.

#### Constructor options:
 - globeColor - string, globe color hash
 - globeOpacity - float, globe color opacity 0..1
 - withGraticule - bool, if true adds graticule to sphere
 - graticuleColor - string, graticule color hash
 - graticuleOpacity - float, graticule opacity 0..1

### landmap

Plugin draws continents according to given json data

#### Constructor options:
 - dataKey - string, name of the key where the data for the plugin is stored
 - landColor - string, the fill color of the land, for example `yellow`, `rgba(255, 0, 0, 0.5)`, `#f00`, `#ff0000`
 - borderColor - string, color of the land border, for example `yellow`, `rgba(255, 0, 0, 0.5)`, `#f00`, `#ff0000` 
 - borderWidth - string, width of the land border in pixels, for eample `1px`, `2px`

### pin

Plugin draws ping on the globe

#### Constructor options:
 - pins - list, objects that declares pins

 #### Pins objects fields
 - lng - float, longetude of the point
 - lat - float latitude of the point
 - color - string, color of the point
 - radius - float, raius of the point circle 
 - precision - int, precision of the point circle

 #### Methods
  - addPin - adds single ping to map, `.addPin({pin object})`
  - addPins - adds a list of pins to existing map, `addPins(<{pin object}>)`
  - removePins - removes all pins from map, `removePins()`

### zoom

Plugin zooms in/out sphere using mouse wheel

### drag

Plugin to rotate sphere using mouse

### autorotate

Plugin to autorotate sphere
