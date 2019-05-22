export const _footer_action_tpl = (actions) => {
    return `
        <div class="button-wrapper">
            ${actions.next ? `<input type="button" class="btn btn-success font-weight-bold text-dark" id="next-action" name="action-button" value="Next" />` : ''}
            ${actions.cancel ? `<input type="button" class="btn btn-light font-weight-bold text-dark" id="cancel-action" name="action-button" value="Cancel" />` : ''}
            ${actions.startOver ? `<input type="button" class="btn btn-success font-weight-bold text-dark" id="start-over-action" name="action-button" value="Start over" />` : ''}
        </div>
    `;
};
