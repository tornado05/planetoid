import PlanetoidPlugin from "./plugin"
import { feature } from "topojson"

export default class LandMapPlugin extends PlanetoidPlugin{
    constructor(options = {}) {
        super()        
        this.data = null                
    }

    draw(context, path, projection) {
        if (!this.data) {
            const data = this.getData("worldMap")
            this.data = feature(data, data.objects.land)
        }
        context.beginPath()
        path.context(context)(this.data)
        context.fillStyle = "rgba(0, 255, 0, 0.5)"
        context.fill()

        context.strokeStyle = "#0f0"
        context.lineWidth = "1px"
        context.stroke()

        context.closePath()
    }
}