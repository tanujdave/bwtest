import {titleCase} from '../utils';


export const _area_params_input_tpl = (params) => {
    return `${Object.keys(params).map(function (key) {
        return `<div class="form-group">
                    <div><label class="font-weight-bold" for="param-${key}">${titleCase(key)}:</label></div>
                    <div><input class="form-control" type="number" name="area-param-input" id="param-${key}" /></div>
                </div>`           
    }).join("")}`
};