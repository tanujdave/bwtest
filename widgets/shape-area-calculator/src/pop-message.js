/**
 * PopMessage class.
 */
export default class PopMessage {

    constructor() {
        this.data = {};

        this.setData({
            message: null,
            messageType: null
        });
    }

    setData(data) {
        this.data = Object.assign(
            {}, 
            this.data, 
            data
        );
        if (!this.data.message) {
            return;
        }
        this.render();
    }

    success(message) {
        this.setData({
            message: message,
            messageType: 'success'
        });
    }

    danger(message) {
        this.setData({
            message: message,
            messageType: 'danger'
        });
    }

    warning(message) {
        this.setData({
            message: message,
            messageType: 'warning'
        });
    }

    info(message) {
        this.setData({
            message: message,
            messageType: 'info'
        });
    }

    messageTemplate() {
        const {message, messageType} = this.data;

        return `
            <div class="alert bw-pop-message alert-${messageType}" role="alert">
                ${message}
            </div>
        `;
    }

    render() {
        document.body.insertAdjacentHTML('beforeend', this.messageTemplate());
        setTimeout(function () {
            document.querySelectorAll('.bw-pop-message').forEach(function (ele) {
                ele.remove();
            });
        }, 3000);
    }
}