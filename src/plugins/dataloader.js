import PlanetoidPlugin from "./plugin"
import { json } from "d3-fetch"

export default class DataLoaderPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        this.dataRequests = options.dataRequests ? options.dataRequests : []
    }

    initialize() {
        let promises = []
        this.dataRequests.forEach(request => {
            promises.push(this.loadData(request))
        })
        return Promise.all(promises)
    }

    loadData(request) {
        return json(request.url).then(data => {
            this.setData(request.key, data)
        })
    }
    
}