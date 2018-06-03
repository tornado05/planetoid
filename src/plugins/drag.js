import PlanetoidPlugin from "./plugin"
import { event, select } from "d3-selection"
import { scaleLinear } from "d3-scale"
import { drag } from "d3-drag"

const PLUGIN_EVENTS = {
    DRAGSTART: "dragstart",
    DRAGEND: "dragend"
}

const DRAG_EVENTS = {
    START: "start",
    END: "end",
    DRAG: "drag"
}

export default class DragPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()        
    }

    initialize ({canvas, projection}) {
        this.projection = projection
        this.drag = drag()
            .on(DRAG_EVENTS.START, this.onDragStart.bind(this))
            .on(DRAG_EVENTS.END, this.onDragEnd.bind(this))
            .on(DRAG_EVENTS.DRAG, this.onDrag.bind(this))
        select(canvas).call(this.drag)
    }

    onDragStart () {
        this.notify({name: PLUGIN_EVENTS.DRAGSTART})
    }

    onDragEnd () {
        this.notify({name: PLUGIN_EVENTS.DRAGEND})
    }

    onDrag () {
        let rotation = this.projection.rotate()
        const radius = this.projection.scale()
        const scaler = scaleLinear().domain([-1 * radius, radius]).range([-90, 90])
        rotation[0] += scaler(event.dx)
        rotation[1] -= scaler(event.dy)
        if (rotation[1] > 90)   rotation[1] = 90
        if (rotation[1] < -90)  rotation[1] = -90
        if (rotation[0] >= 180) rotation[0] -= 360
        this.projection.rotate(rotation)
    }
}
