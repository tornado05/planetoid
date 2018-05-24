import PlanetoidPlugin from "./plugin"
import { event, select } from "d3-selection"
import { scaleLinear } from "d3-scale"
import { drag } from "d3-drag"

export default class DragPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()        
    }

    initialize ({canvas, projection}) {
        this.projection = projection
        this.drag = drag()
            .on("start", this.onDragStart.bind(this))
            .on("end", this.onDragEnd.bind(this))
            .on("drag", this.onDrag.bind(this))
        select(canvas).call(this.drag)
    }

    onDragStart () {
    }

    onDragEnd () {

    }

    onDrag () {
        const dx = event.dx
        const dy = event.dy
        let rotation = this.projection.rotate()
        const radius = this.projection.scale()
        const scaler = scaleLinear().domain([-1 * radius, radius]).range([-90, 90])
        rotation[0] += scaler(dx)
        rotation[1] -= scaler(dy)
        if (rotation[1] > 90)   rotation[1] = 90
        if (rotation[1] < -90)  rotation[1] = -90
        if (rotation[0] >= 180) rotation[0] -= 360
        this.projection.rotate(rotation)
        this.afterDrag()
    }

    afterDrag () {
    }
}
