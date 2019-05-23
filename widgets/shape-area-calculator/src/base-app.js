/**
 * BaseApp class.
 */
export default class BaseApp {

    constructor({container = 'app'}) {
        this.data = {};        
        this.appContainer = container;        
        this.containerWrapper = document.querySelector(`#${this.appContainer}`);
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
        this.containerWrapper.innerHTML = this.getRenderContent();
    }
}