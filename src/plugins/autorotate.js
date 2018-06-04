import PlanetoidPlugin from "./plugin"

const BLOCKING_EVENTS = {
    DRAGSTART: "dragstart",
    DRAGEND: "dragend"
}

const ROTATION_TYPES = {
    HORISONTAL: "horisontal",
    VERTICAL: "vertical"
}

const ROTATION_DIRECTIONS = {
    POSITIVE: "positive",
    NEGATIVE: "negative"
}

const DEFAULT_DEGREE_PER_SEC = 3
const DEFAULT_ROTATION_TYPE = ROTATION_TYPES.HORISONTAL
const DEFAULT_ROTATION_DIRECTION = ROTATION_DIRECTIONS.POSITIVE

export default class AutoRotatePlugin extends PlanetoidPlugin{

    constructor(options={}) {
        super()
        this.degreePerSec = options.degreePerSec ? options.degreePerSec : DEFAULT_DEGREE_PER_SEC
        this.type = options.type ? options.type : DEFAULT_ROTATION_TYPE
        this.direction = options.direction ? options.direction : DEFAULT_ROTATION_DIRECTION
        this.enabled = true
        this.startTime = Date.now()
    }

    initialize({canvas, projection}) {
        this.addEventListener(BLOCKING_EVENTS.DRAGSTART, () => this.enabled = false)
        this.addEventListener(BLOCKING_EVENTS.DRAGEND, () => this.enabled = true)
        return super.initialize({canvas, projection})
    }

    draw({projection}) {
        if (this.enabled) {
            let rotation = projection.rotate()
            projection.rotate(this._calculateRotation(rotation))
        }
        this.startTime = Date.now()
    }

    _calculateRotation(rotation) {
        let timeDelta = Date.now() - this.startTime
        switch (this.type) {
            case ROTATION_DIRECTIONS.HORISONTAL:
                if (this.direction === ROTATION_DIRECTIONS.POSITIVE) 
                   rotation[0] += this.degreePerSec * timeDelta / 1000
                else
                   rotation[0] -= this.degreePerSec * timeDelta / 1000   
                break
            case ROTATION_DIRECTIONS.VERTICAL:
                if (this.direction === ROTATION_DIRECTIONS.POSITIVE) 
                    rotation[1] += this.degreePerSec * timeDelta / 1000
                else
                    rotation[1] -= this.degreePerSec * timeDelta / 1000 
                break
            default:
                if (this.direction === ROTATION_DIRECTIONS.POSITIVE) {
                    rotation[0] += this.degreePerSec * timeDelta / 1000 
                    rotation[1] += this.degreePerSec * timeDelta / 1000
                } else {
                    rotation[0] -= this.degreePerSec * timeDelta / 1000 
                    rotation[1] -= this.degreePerSec * timeDelta / 1000 
                }
        }
        return rotation
    }
}