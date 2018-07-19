import PlanetoidPlugin from "./plugin"
import { geoCircle } from "d3-geo"
import { Events } from "./../events"

const DEFAULT_PIN_RADIUS = 1
const DEFAULT_PIN_PRECISION = 3
const DEFAULT_PIN_COLLOR = "yellow"

const PLUGIN_NAME = "pinPlugin"
const DEFAULT_DATA_KEY = "pins"

export default class PinPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()        
        this.pins = options.pins ? options.pins : []
        this.dataKey = options.dataKey ? options.dataKey : DEFAULT_DATA_KEY
        this.name = PLUGIN_NAME
    }

    initialize() {
        this.addEventListener(Events.DRAW_LOOP_START, () => {
            if (this.pins.length === 0) {
                let pinsData = this.getData(this.dataKey)
                this.pins = pinsData ? pinsData : []
            }   
        })
    }

    _getPingForm (pin) {
        const radius = pin.radius ? pin.radius : DEFAULT_PIN_RADIUS
        const precision = pin.precision ? pin.precision : DEFAULT_PIN_PRECISION
        return geoCircle().center([pin.lng, pin.lat]).radius(radius).precision(precision)()
    }

    _drawPing(pin, context, path) {
        context.beginPath()
        path.context(context)(this._getPingForm(pin))
        context.strokeStyle = pin.color ? pin.color : DEFAULT_PIN_COLLOR
        context.fillStyle = pin.fillColor ? pin.fillColor : DEFAULT_PIN_COLLOR
        context.fill()
        context.stroke()
        context.closePath()
    }

    addPin(pin) {
        this.pins.push(pin)
    }

    addPins(pins) {
        this.pins = this.pins.concat(pins)
    }

    removePins() {
        this.pins = []
    }

    replacePins(pins) {
        this.pins = pins
    }

    highlightPins(filter, options = {}) {
        this.pins.forEach(pin => {
            if (filter(pin)) {
                pin.radius = options.radius ? options.radius : pin.radius * 2
            }
        })
    }

    draw({context, path}) {
        this.pins.forEach( pin => this._drawPing(pin, context, path))
    }
}
