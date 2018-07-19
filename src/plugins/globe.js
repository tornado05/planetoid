import PlanetoidPlugin from "./plugin"
import { Events } from "./../events"
import { calculateInitialScale } from "./../util"
import { geoGraticule } from "d3-geo"

const DEFAULT_GLOBE_COLOR = "#68d2e8"
const DEFAULT_GLOBE_OPACITY = 1
const DEFAULT_GRATICULE_COLOR = "#ff7777"
const DEFAULT_GRATICULE_OPACITY = 0.5
const PLUGIN_NAME = "globePlugin"

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
        this.autoScaleGloble = options.autoScaleGloble ? options.autoScaleGloble : true
        this.autoCenterGlobe = options.autoCenterGlobe ? options.autoCenterGlobe : true
        this.name = PLUGIN_NAME     
    }

    initialize() {
        this.addEventListener(Events.CANVAS_RESIZE, () => {
            this.autoCenterGlobe = true
            this.autoScaleGloble = true
        }) 
    }

    autoCenter (canvas, projection) {
        projection.translate([canvas.width / 2, canvas.height / 2])
        this.autoCenterGlobe = false
    }

    autoScale(canvas, projection) {
        projection.scale(calculateInitialScale(canvas))
        this.autoScaleGloble = false
    }

    draw({context, path, canvas, projection}) {
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
        if (this.autoCenterGlobe) {
            this.autoCenter(canvas, projection)
        }
        if (this.autoScaleGloble) {
            this.autoScale(canvas, projection)
        }
    }
}
