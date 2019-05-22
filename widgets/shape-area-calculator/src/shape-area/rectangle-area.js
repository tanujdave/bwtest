import AbstractShapeArea from './abstract-shape-area';


/**
 * RectangleArea class.
 */
export default class RectangleArea extends AbstractShapeArea {
    constructor() {
        super();
        this.params = {
            height: null,
            width: null
        };
    }
    
    area() {
        const {height, width} = this.params;
        if (!this.validateParams()) {
            throw new Error('Invalid parameters!');
        }
        this._result = parseFloat(height) * parseFloat(width); 
    }
}