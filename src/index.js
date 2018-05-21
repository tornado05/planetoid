import Planetoid from "./planetoid"
import * as PlanetoidPlugins from "./plugins"

window.Planetoid = Planetoid
window.PlanetoidPlugins = PlanetoidPlugins

export default (options) => {
    return new Planetoid(options)
}
