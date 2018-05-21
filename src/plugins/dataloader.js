import PlanetoidPlugin from "./plugin"
import { json } from "d3-fetch"

export default class DataLoaderPlugin extends PlanetoidPlugin{
    constructor(options={}) {
        super()
        if (!options.url) {throw "Missing data url" }
        this.url = options.url        
    }

    initialize() {
        return json(this.url).then(data => {
            this.setData("worldMap", data)
        })
    }
    
}