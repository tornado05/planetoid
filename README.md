# Planetoid

## Description

This is a library of modeling planets using d3 and topojson, written using es6. The main point is to use es6 syntax and to be able to import it into project.
##### NOTE: version < 0.1.x is under development so please do not use it. 

## Requirments

This project requires `node >= 8.0.x` to build it.

## Architecture

Overall structure is core part, class `Planetoid`. The module runs draw loop, which is executing plugins that are drawing the data. Core contains observer to comunicate between plugins using events(NOTE: event object should include field `name`).

### Project parts:
 - Core - file `planetoid.js`
 - Logger - file `log.js`
 - Constants - file `constants.js`
 - Events - file `events.js`

## Core

### Methods:
 - draw - starts draw loop, `.draw()`
 - stop - stops draw loop, `.stop()`
 - addEventListener - adds event listener, `.addEventListener(<event name>, <callback>)`
 - notify - triggers event listeners, `.notify(<event object>)`, `{name: <event name>, ...}`

## Plugins

### General plugin structure

Plugin is a class inherited from `PlanetoidPlugin`.

#### Lifecycle:
 - initialize - this method is called once, before main draw loop is started
 - beforeDraw - this method is called each time before draw
 - draw - this method should contain code that is visualizing data
 - afterDraw -this method is called each time after draw

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
