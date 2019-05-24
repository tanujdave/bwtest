import config from './config/defaultOption';
import stepContent from './config/formStepData';
import BaseApp from './base-app';
import {_base_tpl} from './templates/base_tpl';
import {
    RectangleArea as rectangle, 
    CircleArea as circle,
    SquareArea as square,
    EclipseArea as eclipse
} from './shape-area/index';

import './styles/bootstrap.min.css';
import './styles/app.css';

const shapeClasses = {
    rectangle,
    circle,
    square,
    eclipse
};

const NEXT_ACTION = 'next-action';
const CANCEL_ACTION = 'cancel-action';
const START_OVER_ACTION = 'start-over-action';
const SELECT_SHAPE = 'select-shape';
const AREA_PARAM_INPUT = 'area-param-input';

/**
 * ShapeAreaCalculator class.
 */
export class ShapeAreaCalculator extends BaseApp {
    
    constructor({container, shapeList = []}) {
        super(container);
        let activeStep = 0;
        let shapes = shapeList.length > 0 ? shapeList : config.shapeList;            
        this.appContainer = container;

        this.setData({
            activeStep: activeStep,
            shapeList: shapes.filter(shape => shapeClasses.hasOwnProperty(shape)),
            selectedShape: null,
            stepContent: stepContent,
            activeShapeObject: null
        });
    }        

    selectElement(ele, all=false) {
        if (all) {
            return document.querySelectorAll(`#${this.appContainer} ${ele}`);    
        }
        return document.querySelector(`#${this.appContainer} ${ele}`);
    }

    stepValidation(action) {
        const {activeStep, selectedShape, activeShapeObject} = this.data;

        if (action === NEXT_ACTION && 0 === activeStep) {
            if (!selectedShape) {
                throw new Error('Please select shape.');
            }
        } else if (action === NEXT_ACTION && 1 === activeStep) {
            Object.keys(activeShapeObject.params).map(function(key) {
                if (!activeShapeObject.params[key]) {
                    throw new Error('Area parameters cannot be empty.');
                }
            }.bind(this));
        }
    }

    actionHandler(event) {
        const action = event.target.id;
        try {
            this.stepValidation(action);
            this.process(action);
        } catch (error) {
            this.popMessage.danger(error);
        }
    }

    process(action) {
        const {activeStep, activeShapeObject} = this.data;
        let step = activeStep;

        if (NEXT_ACTION === action) {
            step = activeStep + 1;
            if (2 === step) {
                activeShapeObject.area();
            }            
        } else if (CANCEL_ACTION === action) {                        
            step = activeStep - 1;
            if (0 == step) {
                activeShapeObject.resetParams();
            }
        } else if (START_OVER_ACTION === action) {            
            this.setData({
                activeStep: 0,
                selectedShape: null,
                activeShapeObject: null,                
            })
            return;
        }
        this.setData({
            activeStep: step
        });    
    }

    bindEvents() {
        this.bindParamsInputEvent();
        this.bindActionButtonEvent();
        this.bindShapeSelectEvent();
    }

    bindParamsInputEvent() {
        const {activeShapeObject} = this.data;

        this.selectElement(`[name=${AREA_PARAM_INPUT}]`, true).forEach(function (ele, idx) {
            ele && ele.addEventListener('blur', function (e) {
                activeShapeObject.setParams(
                    e.target.id.split('-')[1], 
                    e.target.value
                );
            }.bind(this));
        }.bind(this));
    }

    bindActionButtonEvent() {
        this.selectElement(`[name=action-button]`, true).forEach(function (ele, idx) {
            ele && ele.addEventListener('click', this.actionHandler.bind(this));
        }.bind(this));
    }

    bindShapeSelectEvent() {
        const {selectedShape, activeShapeObject} = this.data;

        this.selectElement(`[name=${SELECT_SHAPE}]`, true).forEach(function (ele, idx) {
            ele && ele.addEventListener('click', function (e) {                
                if (!shapeClasses.hasOwnProperty(e.target.value)) {
                    return;
                }
                this.setData({
                    selectedShape: e.target.value,
                    activeShapeObject: new shapeClasses[e.target.value]()
                })
            }.bind(this));
        }.bind(this))
    }

    getRenderContent() {        
        return _base_tpl(this.data);
    }
}