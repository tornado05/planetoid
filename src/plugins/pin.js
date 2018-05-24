import PlanetoidPlugin from "./plugin"
import { geoCircle } from "d3-geo"

export default class PinPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()        
        this.pins = options.pins ? options.pins : []
    }

    _getPingForm (pin) {
        return geoCircle().center([pin.lng, pin.lat]).radius(1).precision(3)()
    }

    _drawPing(pin, context, path, projection) {
        context.beginPath()
        path.context(context)(this._getPingForm(pin))
        context.strokeStyle = "yellow"
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
