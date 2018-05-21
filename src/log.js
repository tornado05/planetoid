import { LOG_MODES } from "./constants"

export default class Logger {
    constructor(logMode) {
        this.logMode = logMode
    }

    log (message, type=null) {
        const date = new Date()
        const logType = type ? type : LOG_MODES.DEBUG
        const msg = `${date} | ${logType} | ${message}`
        switch(type) {
        case LOG_MODES.ERROR: 
            console.error(msg) 
            break
        case LOG_MODES.WARNING:
            console.warn(msg)
            break
        case LOG_MODES.INFO: 
            console.info(msg)
            break
        default: if (this.logMode === LOG_MODES.DEBUG) { console.log(msg) }
        }        
    }
}
