import PlanetoidPlugin from "./plugin"

const rotate = [10, -10]
const velocity = [.003, -.001]
const startTime = Date.now()

const BLOCKING_EVENTS = {
    DRAGSTART: "dragstart",
    DRAGEND: "dragend"
}

export default class AutoRotatePlugin extends PlanetoidPlugin{

    constructor() {
        super()
        this.enabled = true
    }

    initialize({canvas, projection}) {
        this.addEventListener(BLOCKING_EVENTS.DRAGSTART, () => this.enabled = false)
        this.addEventListener(BLOCKING_EVENTS.DRAGEND, () => this.enabled = true)
        return super.initialize({canvas, projection})
    }

    draw({projection}) {
        if (this.enabled) {
            let timeDelta = Date.now() - startTime
            projection.rotate([rotate[0] + velocity[0] * timeDelta, rotate[1] + velocity[1] * timeDelta])
        }
    }
}