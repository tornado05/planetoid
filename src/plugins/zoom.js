import PlanetoidPlugin from "./plugin"
import { zoom } from "d3-zoom"
import { select, event } from "d3-selection"
import { calculateInitialScale } from "./../util"
import { Events } from "./../events"

const DEFAULT_INITIAL_SCALE = 1
const DEFAULT_SCALE_EXTENT = [200, 2000]

const PLUGIN_NAME = "zoomPlugin"

export default class ZoomPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        this.initialScale = options.initialScale ? options.initialScale : DEFAULT_INITIAL_SCALE        
        this.scaleExtent = options.scaleExtent ? options.scaleExtent : DEFAULT_SCALE_EXTENT
        this.name = PLUGIN_NAME
    }

    initialize({canvas, projection}) {
        this.projection = projection
        this.scaleExtent[0] = calculateInitialScale(canvas)
        this.zoom = zoom().scaleExtent(this.scaleExtent)
            .on("zoom", this.onZoom.bind(this))
        select(canvas).call(this.zoom)
        this.addEventListener(Events.CANVAS_RESIZE, () => this.scaleExtent[0] = calculateInitialScale(canvas))
    }

    onZoom () {
        this.projection.scale(event.transform.k)
    }
}
