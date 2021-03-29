// Polyfill For Non-Standard (Chrome Specific) `Event.path`
if (Event.prototype.hasOwnProperty('path') === false) {
    Object.defineProperty(Event.prototype, 'path', {
        get: function propagatedPath() {
            const event = this

            let element = event.target || null
            let path = [element]

            if (!element || !element.parentElement) {
                return []
            }

            while (element.parentElement) {
                element = element.parentElement
                path.push(element)
            }

            path.push(window) // Path Ends At `Window`

            return path
        },
    })
}
