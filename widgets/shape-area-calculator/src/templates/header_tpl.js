export const _header_tpl = (heading, description, result) => {
    return `
        <h4 class="font-weight-bold">${heading}</h4>
        ${description && `<p>${description.replace('{AREA_RESULT}', result)}</p>`}  
    `;
};