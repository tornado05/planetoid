import PlanetoidPlugin from "./plugin"
import { geoCircle } from "d3-geo"

const DEFAULT_PIN_RADIUS = 1
const DEFAULT_PIN_PRECISION = 3
const DEFAULT_PIN_COLLOR = "yellow"

export default class PinPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()        
        this.pins = options.pins ? options.pins : []
    }

    _getPingForm (pin) {
        const radius = pin.radius ? pin.radius : DEFAULT_PIN_RADIUS
        const precision = pin.precision ? pin.precision : DEFAULT_PIN_PRECISION
        return geoCircle().center([pin.lng, pin.lat]).radius(radius).precision(precision)()
    }

    _drawPing(pin, context, path, projection) {
        context.beginPath()
        path.context(context)(this._getPingForm(pin))
        context.strokeStyle = pin.color ? pin.color : DEFAULT_PIN_COLLOR
        context.stroke()
        context.closePath()
    }

    addPin(pin) {
        this.pins.push(pin)
    }

    addPins(pins) {
        this.pins.concat(pins)
    }

    draw({context, path, projection}) {
        this.pins.forEach( pin => this._drawPing(pin, context, path, projection))
    }
}
