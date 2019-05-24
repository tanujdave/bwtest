import PopMessage from "./pop-message";

/**
 * BaseApp class.
 */
export default class BaseApp {

    constructor(container) {
        this.data = {};        
        this.appContainer = container;
        this.containerWrapper = document.querySelector(`#${this.appContainer}`);
        this.popMessage = new PopMessage();


        if(!this.containerWrapper) {
            this.popMessage.danger(`Container not found for given id#${container}`);
            return;
        }
    }    

    setData(data) {
        this.data = Object.assign({}, this.data, data);        
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        throw new Error('You must have to implement this `bindEvents` method.');
    }

    getRenderContent() {
        throw new Error('You must have to implement this `getRenderContent` method.');
    }

    render() {
        if(!this.containerWrapper) {
            return;
        }
        this.containerWrapper.innerHTML = this.getRenderContent();
    }
}