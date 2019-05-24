import config from '../config/defaultOption';

/**
 * AbstractShapeArea class.
 */
export default class AbstractShapeArea {
    
    constructor() {
        this.params = {}
        this._result = null;
    }

    validateParams() {
        Object.keys(this.params).map(function(key) {
            if (!this.params[key]) {
                return false;
            }
        }.bind(this));
        return true;
    }

    setParams(param, value) {
        this.params[param] = value;
    }

    resetParams() {
        Object.keys(this.params).map(function (key) {
            this.params[key] = null;
        }.bind(this));
    }

    area() {
        throw new Error('You must have to implement this `area` method.');
    }

    get result() {
        return `${this._result ? this._result.toFixed(2) : ''} ${this.unit()}`;
    }

    unit() {
        return `${config.unit} <sup>2</sup>`;
    }
}