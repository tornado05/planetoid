export default class PlanetoidPlugin {
    constructor() {
    }
    
    initialize(canvas, projection) {
        return Promise.resolve()
    }

    beforeDraw() {

    }

    draw(context, path, projection) {

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
}
