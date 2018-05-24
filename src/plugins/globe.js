import PlanetoidPlugin from "./plugin"
import { geoGraticule } from "d3-geo"

const DEFAULT_GLOBE_COLOR = "#68d2e8"
const DEFAULT_GLOBE_OPACITY = 1
const DEFAULT_GRATICULE_COLOR = "#ff7777"
const DEFAULT_GRATICULE_OPACITY = 0.5

export default class GlobePlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        const globeColor =  options.globeColor ? options.globeColor : DEFAULT_GLOBE_COLOR
        const globeOpacity =  options.globeOpacity ? options.globeOpacity : DEFAULT_GLOBE_OPACITY
        this.fillColor = this.getColorWithOpacity(globeColor, globeOpacity)
        this.graticule = options.withGraticule ? geoGraticule() : null
        const graticuleColor = options.graticuleColor ? options.graticuleColor : DEFAULT_GRATICULE_COLOR
        const graticuleOpacity = options.graticuleOpacity ? options.graticuleOpacity : DEFAULT_GRATICULE_OPACITY
        this.strokeColor = this.getColorWithOpacity(graticuleColor, graticuleOpacity)        
    }

    draw({context, path}) {
        context.beginPath()
        path.context(context)({type: "Sphere"})
        context.fillStyle = this.fillColor
        context.fill()
        if (this.graticule) {
            path.context(context)(this.graticule())
            context.strokeStyle = this.strokeColor
            context.stroke()
        }
        context.closePath()
    }
}
