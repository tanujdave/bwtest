import {_header_tpl} from './header_tpl';
import {_footer_action_tpl} from './footer_action_tpl';
import {_area_shape_option_tpl} from './area_shape_option_tpl';
import {_area_params_input_tpl} from './area_params_input_tpl';
import {_area_result_tpl} from './area_result_tpl';


export const _base_tpl = (data) => {

    const {activeStep, shapeList, selectedShape} = data;
    const {heading, description, actions} = data.stepContent[activeStep];
    const {params, result} = data.activeShapeObject || {};    

    return `
        <div class="card bw-shape-calculator">        
            <div class="card-body">
                <div class="header row">
                    <div class="col col-sm-12">
                        ${_header_tpl(heading, description, result)}                    
                    </div>
                </div>
                <div class="middle row">
                    <div class="col col-sm-12">
                        ${description && `<p class="card-text">${description.replace('{AREA_RESULT}', result)}</p>`}  
                        <div class="form-wrapper form-group form-step-${activeStep}">
                            ${activeStep === 0 ? _area_shape_option_tpl(shapeList, selectedShape) : ''}
                            ${activeStep === 1 ? _area_params_input_tpl(params) : ''}
                            ${activeStep === 2 ? _area_result_tpl(result) : ''}
                        </div>
                    </div>
                </div>
                <div class="footer row">
                    <div class="col col-sm-12">
                        ${_footer_action_tpl(actions)}
                    </div>
                </div>        
            </div>
        </div>
    `;
}