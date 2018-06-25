import PlanetoidPlugin from "./plugin"
import { mesh } from "topojson"

const BORDER_TYPES = {
    INTERNAL: "internal",
    EXTERNAL: "external",
    BOTH: "both"
}
const DEFAULT_DATA_KEY = "worldMap"
const DEFAULT_BORDER_TYPE = BORDER_TYPES.INTERNAL

const DEFAULT_BORDER_COLOR = "red"

const PLUGIN_NAME = "countryPlugin"

export default class CountryPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        this.dataKey = options.dataKey ? options.dataKey : DEFAULT_DATA_KEY
        this.type = options.type ? options.type : DEFAULT_BORDER_TYPE
        this.borderColor = options.borderColor ? options.borderColor : DEFAULT_BORDER_COLOR
        this.name = PLUGIN_NAME
    }

    draw({context, path}) {
        if (!this.data) {
            const data = this.getData(this.dataKey)
            this.data = mesh(data, data.objects.countries, this._getBorderTypeFunction())
        }
        context.beginPath()
        path.context(context)(this.data)
        context.strokeStyle = this.borderColor
        context.stroke()
        context.closePath()
    }

    _getBorderTypeFunction() {
        switch(this.type) {
        case BORDER_TYPES.INTERNAL: return (a, b) =>  a.id !== b.id
        case BORDER_TYPES.EXTERNAL: return (a, b) =>  a.id === b.id
        case BORDER_TYPES.BOTH: return () => true
        }
    }
}