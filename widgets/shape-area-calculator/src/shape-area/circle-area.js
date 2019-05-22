import AbstractShapeArea from './abstract-shape-area';


/**
 * CircleArea class.
 */
export default class CircleArea extends AbstractShapeArea {
    constructor() {
        super();
        this.params = {
            radius: null
        };
    }

    area() {
        const {radius} = this.params;
        const PIE = 3.14;

        if (!this.validateParams()) {
            throw new Error('Invalid parameters!');
        }
        this._result = PIE * (parseFloat(radius) * parseFloat(radius)); 
    }
}