import config from './config/defaultOption';
import stepContent from './config/formStepData';
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
export class ShapeAreaCalculator {
    
    constructor({container = 'app', shapeList = []}) {
        this.step = 0;
        this.container = container;
        this.selectedShape = null;
        this.containerWrapper = document.querySelector(`#${container}`);
        this.shapeList = shapeList.length > 0 ? shapeList : config.shapeList;
        this.shapeList = this.shapeList.filter(shape => shapeClasses.hasOwnProperty(shape));
        this.activeShapeObject = null;
    }

    buildData() {
        this.appData = {
            activeStep: this.step,
            shapeList: this.shapeList,
            selectedShape: this.selectedShape,
            stepContent: stepContent[this.step],
            activeShapeObject: this.activeShapeObject,
        };
    }

    init() {
        this.buildData();
        this.render();
        this.bindEvents();
    }

    reset() {
        this.step = 0;
        this.selectedShape = null;
        this.activeShapeObject = null;
    }

    selectElement(ele, all=false) {
        if (all) {
            return document.querySelectorAll(`#${this.container} ${ele}`);    
        }
        return document.querySelector(`#${this.container} ${ele}`);
    }

    stepValidation(action) {
        if (action === NEXT_ACTION && 0 === this.step) {
            if (!this.selectedShape) {
                throw new Error('Please select shape.');
            }
        } else if (action === NEXT_ACTION && 1 === this.step) {
            Object.keys(this.activeShapeObject.params).map(function(key) {
                if (!this.activeShapeObject.params[key]) {
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
            this.renderError(error);
        }
    }

    renderError(message) {
        this.selectElement('.error-message').innerHTML = message;
        this.selectElement('.error-message').style.display = message ? 'block' : 'none';
    }

    process(action) {
        if (NEXT_ACTION === action) {
            this.step = this.step + 1;
            if (2 === this.step) {
                this.activeShapeObject.area();
            }
        } else if (CANCEL_ACTION === action) {
            this.step = this.step - 1;
        } else if (START_OVER_ACTION === action) {
            this.reset();
        }
        this.init();
    }

    bindEvents() {
        this.bindParamsInputEvent();
        this.bindActionButtonEvent();
        this.bindShapeSelectEvent();
    }

    bindParamsInputEvent() {
        this.selectElement(`[name=${AREA_PARAM_INPUT}]`, true).forEach(function (ele, idx) {
            ele && ele.addEventListener('blur', function (e) {
                this.activeShapeObject.setParams(
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
        this.selectElement(`[name=${SELECT_SHAPE}]`, true).forEach(function (ele, idx) {
            ele && ele.addEventListener('click', function (e) {
                this.selectedShape = e.target.value;
                if (!shapeClasses.hasOwnProperty(e.target.value)) {
                    return;
                }
                this.activeShapeObject = new shapeClasses[e.target.value]();
                this.renderError(null);
            }.bind(this));
        }.bind(this))
    }

    getSelectedStepHtml() {
        return _base_tpl(this.appData);
    }

    render() {
        this.containerWrapper.innerHTML = this.getSelectedStepHtml();
    }
}