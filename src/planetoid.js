import { timer, select, event } from "d3"
import { geoOrthographic, geoPath } from "d3-geo"
import { LOG_MODES } from "./constants"
import Logger from "./log"
import { Events } from "./events"

export default class Planetoid {
    constructor(options={}) {
        this.dataExtractor = options.dataExtractor ? options.dataExtractor : null
        this.logger = new Logger(options.debugMode ? LOG_MODES.DEBUG : LOG_MODES.INFO)
        this.canvas = this._prepareCanvas(options.canvasSelector)
        this.context = this.canvas.getContext("2d")  
        this.projection = geoOrthographic().clipAngle(90)
        this.path = geoPath().projection(this.projection)
        this.plugins = []
        this.data = {}
        this.eventListeners = {}
    }

    _prepareCanvas (canvasId) {
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

    _extractMouseCordsFromEvent (event) {
        const x = event.layerX || event.offsetX 
        const y = event.layerY || event.offsetY
        return {x, y}
    }

    _runDrawLoop () {
        select(this.canvas).on("mousemove", () => {
            const {x, y} = this._extractMouseCordsFromEvent(event)
            this.notify({name: Events.MOUSEMOVE, x, y})
        })
        select(this.canvas).on("click", () => {
            const {x, y} = this._extractMouseCordsFromEvent(event)
            this.notify({name: Events.CLICK, x, y})
        })
        this.timer = timer(() => {            
            this.notify({name: Events.BEFORE_DRAW_ITERATION})
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)            
            this.plugins.forEach((plugin) => {
                this.context.save()
                plugin.beforeDraw()
                plugin.draw({context: this.context, path: this.path, projection: this.projection, canvas: this.canvas})
                plugin.afterDraw()
                this.context.restore()
            })
            this.notify({name: Events.AFTER_DRAW_ITERATION})
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
        const dataExtractor = this.dataExtractor ? key => this.dataExtractor(key) : key => this.data[key]        
        const methods = {
            getData: dataExtractor,
            addEventListener: (eventName, listener) => this.addEventListener(eventName, listener),
            notify: event => this.notify(event),
            logger: this.logger
        }
        if (!this.dataExtractor) {
            methods["setData"] = (key, value) => this.data[key] = value
        }
        plugin.injectMethods(methods)
        this.plugins.push(plugin)
    }

    getPlugin (name) {
        const plugins = this.plugins.filter(plugin => plugin.name === name)
        return plugins && plugins.length > 0 ? plugins[0] : null
    }

    draw () {
        Promise.all(this._initPlugins()).then(() => {
            this.notify({name: Events.DRAW_LOOP_START})
            this._runDrawLoop()
        }).catch(error => {
            this.logger.log(error, LOG_MODES.ERROR)
        })        
    }

    stop () {
        this.timer.stop()
    }
    
    getEventGeoCoordinates (event) {
        const coords = this.projection.invert([event["x"], event["y"]])
        return {
            lat: coords[0],
            lng: coords[1]
        }
    }
}
