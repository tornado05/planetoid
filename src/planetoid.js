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
        this.eventListeners = {}
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
            const pluginPromises = plugin.initialize({canvas: this.canvas, projection: this.projection})
            if (Array.isArray(pluginPromises))
                promises.concat(pluginPromises)
            else
                promises.push(pluginPromises)
        })
        return promises
    }

    _runDrawLoop () {
        timer(() => {
            this.logger.log("Draw iteration started")
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)            
            this.plugins.forEach((plugin) => { 
                console.log("Plugin name", plugin.name)
                this.context.save()
                plugin.beforeDraw()
                plugin.draw({context: this.context, path: this.path, projection: this.projection, canvas: this.canvas})
                plugin.afterDraw()
                this.context.restore()
            })
            this.logger.log("Draw iteration finished")
        })
    }

    addEventListener(eventName, listener) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = []
        }
        this.eventListeners[eventName].push(listener)
    }

    notify (event) {
        if (this.eventListeners[event.name]) {
            this.eventListeners[event.name].forEach(listener => listener(event))
        }
    }

    addPlugin (plugin) {        
        plugin.injectMethods({
            setData: (key, value) => this.data[key] = value,
            getData: key => this.data[key],
            addEventListener: (eventName, listener) => this.addEventListener(eventName, listener),
            notify: event => this.notify(event),
            logger: this.logger
        })
        this.plugins.push(plugin)
    }

    draw () {
        Promise.all(this._initPlugins()).then(() => {
            this._runDrawLoop()
        }).catch(error => {
            this.logger.log(error, LOG_MODES.ERROR)
        })        
    }
}
