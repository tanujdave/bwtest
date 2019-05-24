import AbstractShapeArea from './abstract-shape-area';


/**
 * EclipseArea class.
 */
export default class EclipseArea extends AbstractShapeArea {
    
    constructor() {
        super();
        this.params = {
            height: null,
            width: null
        };
    }

    area() {
        const {height, width} = this.params;
        const PIE = 3.14;

        if (!this.validateParams()) {
            throw new Error('Invalid parameters!');
        }
        this._result = PIE * (parseFloat(height) * parseFloat(width)); 
    }
}