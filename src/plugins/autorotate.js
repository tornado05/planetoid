import PlanetoidPlugin from "./plugin"

const rotate = [10, -10]
const velocity = [.003, -.001]
const time = Date.now()

export default class AutoRotatePlugin extends PlanetoidPlugin{
    draw({projection}) {
        let dt = Date.now() - time
        projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt])
    }
}