class SearchState {
    constructor() {
      this.state = {
        "phone-button": false,
        "email-button": true,
      }

      this.options = Object.keys(this.state)
      this._resetState = this._resetState.bind(this)
    }

    _resetState() {
      const resetState = {}
      this.options.forEach(function (key) {
        resetState[key] = false
      })
      this.state = resetState
    }

    get(handler) {
      return this.state[handler]
    }

    set(handler) {
      this._resetState()
      this.state[handler] = true
    }
  }