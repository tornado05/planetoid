import PlanetoidPlugin from "./plugin"
import { geoGraticule } from "d3-geo"

const DEFAULT_FILL_COLOR = "#68d2e8"
const DEFAULT_STROKE_COLOR = "#ff7777"

export default class GlobePlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        this.fillColor = options.fillColor ? options.fillColor : DEFAULT_FILL_COLOR
        this.strokeColor = options.strokeColor ? options.strokeColor : DEFAULT_STROKE_COLOR
        this.graticule = options.withGraticule ? geoGraticule() : null
    }

    draw(context, path) {
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
