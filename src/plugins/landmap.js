import PlanetoidPlugin from "./plugin"
import { feature } from "topojson"

const DEFAULT_LAND_COLOR = "rgba(0, 255, 0, 0.5)"
const DEFAULT_BORDER_COLOR = "#0f0"
const DEFAULT_BORDER_WIDTH = "1px"
const DEFAULT_DATA_KEY = "worldMap"
const PLUGIN_NAME = "landMapPlugin"

export default class LandMapPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        this.landColor = options.landColor ? options.landColor : DEFAULT_LAND_COLOR
        this.borderColor = options.borderColor ? options.borderColor : DEFAULT_BORDER_COLOR
        this.borderWidth = options.borderWidth ? options.borderWidth : DEFAULT_BORDER_WIDTH
        this.dataKey = options.dataKey ? options.dataKey : DEFAULT_DATA_KEY
        this.name = PLUGIN_NAME
    }

    draw({context, path}) {
        if (!this.data) {
            const data = this.getData(this.dataKey)
            this.data = feature(data, data.objects.land)
        }
        context.beginPath()
        path.context(context)(this.data)
        context.fillStyle = this.landColor
        context.fill()

        context.strokeStyle = this.borderColor
        context.lineWidth = this.borderWidth
        context.stroke()

        context.closePath()
    }
}