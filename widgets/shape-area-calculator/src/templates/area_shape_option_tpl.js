import {titleCase} from '../utils';


export const _area_shape_option_tpl = (shapeList, selected) => {    
    return `${Object.keys(shapeList).map(function (key) {
        return `<div class="form-check">
                    <input class="form-check-input" id="check-${shapeList[key]}" type="radio" name="select-shape" ${selected === shapeList[key] ? "checked" : ''} value="${shapeList[key]}" /> 
                    <label class="form-check-label" for="check-${shapeList[key]}">${titleCase(shapeList[key])}</label>
                </div>`
    }).join("")}`
};