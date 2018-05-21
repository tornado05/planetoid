import { timer } from "d3"
import { geoOrthographic, geoPath } from "d3-geo"
import { LOG_MODES } from "./constants"
import Logger from "./log"

export default class Planetoid{
    constructor(options={}) {
        this.plugins = []
        this.logger = new Logger(options.debugMode ? LOG_MODES.DEBUG : LOG_MODES.INFO)
        this.canvas = this._getCanvas(options.canvasSelector)
        this.context = this.canvas.getContext("2d")  
        this.projection = geoOrthographic().clipAngle(90)
        this.path = geoPath().projection(this.projection)
        this.data = {}
    }

    _getCanvas (canvasId) {
        const canvas = document.getElementById(canvasId)
        if (!canvas) {
            const msg = `Canvas element with selector ${canvasId} not found`
            this.logger.log(msg, LOG_MODES.ERROR)
            throw msg
        }
        return canvas
    }

    _initPlugins () {
        let promises = []
        this.plugins.forEach((plugin) => { 
            promises.push(plugin.initialize(this.canvas, this.projection))
        })
        return promises
    }

    _runDrawLoop () {
        timer(() => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.onDraw()

            this.plugins.forEach((plugin) => { 
                this.context.save()
                plugin.beforeDraw()
                plugin.draw(this.context, this.path, this.projection)
                plugin.afterDraw()
                this.context.restore()
            })
        })
    }

    addPlugin (plugin) {
        plugin.setDataSetter((key, value) => this.data[key] = value)
        plugin.setDataGetter(key => this.data[key])
        this.plugins.push(plugin)
    }

    draw () {
        Promise.all(this._initPlugins()).then(() => {
            this.onDrawStart()        
            this._runDrawLoop()
        }).catch(error => {
            this.logger.log(error, LOG_MODES.ERROR)
        })        
    }

    onDraw () {
        this.logger.log("OnDrawCallback start")
        this.logger.log("OnDrawCallback end")
    }

    onDrawStart () {

    }

    onDrawStop () {

    }
}
