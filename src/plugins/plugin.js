import { color } from "d3-color"

export default class PlanetoidPlugin {
    constructor() {
    }
    
    initialize() {
        return Promise.resolve()
    }

    beforeDraw() {

    }

    draw() {

    }

    afterDraw() {

    }

    injectMethods ({notify, addEventListener, logger, getData, setData}) {
        this.notify = notify
        this.addEventListener = addEventListener
        this.logger = logger
        this.getData = getData
        this.setData = setData
    }

    getColorWithOpacity(clr, opacity=1) {
        let col = color(clr)
        col.opacity = opacity
        return col.toString()
    }
}
