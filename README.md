# Planetoid

## Description

This is a library of modeling planets using d3 and topojson. The main point is to use es6 syntax and to be able to import it into project. 

## Requirments

This project requires `node >= 7.0.x` to build it.

## Plugins

### dataloader

Plugin loads json data and stores it under the key

### globe 

Plugin draws basic Sphere and color. Graticule can be added to sphere.

Params:
 - globeColor - string, globe color hash
 - globeOpacity - float, globe color opacity 0..1
 - withGraticule - bool, if true adds graticule to sphere
 - graticuleColor - string, graticule color hash
 - graticuleOpacity - float, graticule opacity 0..1

### landmap

Plugin draws continents according to given json data

### pin

Plugin draws ping on the globe

### zoom

Plugin zooms in/out sphere using mouse wheel

### drag

Plugin to rotate sphere using mouse

### autorotate

Plugin to autorotate sphere
