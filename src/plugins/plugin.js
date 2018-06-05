import { color } from "d3-color"

export default class PlanetoidPlugin {
    constructor() {
    }
    
    initialize({canvas, projection}) {
        return Promise.resolve()
    }

    beforeDraw() {

    }

    draw({context, path, projection, canvas}) {

    }

    afterDraw() {

    }

    setDataSetter(dataSetter) {
        this.setData = dataSetter
    }

    setDataGetter(dataGetter) {
        this.getData = dataGetter
    }

    setLogger(logger) {
        this.logger = logger
    }

    setEventListenerSetter (addEventListener) {
        this.addEventListener = addEventListener
    }

    setEventNotifyer (notify) {
        this.notify = notify
    }

    getColorWithOpacity(clr, opacity=1) {
        let col = color(clr)
        col.opacity = opacity
        return col.toString()
    }
}
