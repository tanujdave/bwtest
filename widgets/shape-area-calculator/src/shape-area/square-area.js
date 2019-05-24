import AbstractShapeArea from './abstract-shape-area';


/**
 * SquareArea class.
 */
export default class SquareArea extends AbstractShapeArea {
    
    constructor() {
        super();
        this.params = {
            side: null,
        };
    }
    
    area() {
        const {side} = this.params;
        if (!this.validateParams()) {
            throw new Error('Invalid parameters!');
        }
        this._result = parseFloat(side) * parseFloat(side); 
    }
}