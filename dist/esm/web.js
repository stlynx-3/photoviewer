import { WebPlugin } from '@capacitor/core';
import { defineCustomElements as jeepPhotoviewer } from 'jeep-photoviewer/loader';
export class PhotoViewerWeb extends WebPlugin {
    constructor() {
        super();
        this._imageList = [];
        this._options = {};
        this._mode = 'one';
        this._startFrom = 0;
        this._modeList = ['one', 'gallery', 'slider'];
        this.jeepPhotoViewerResult = (ev) => {
            const res = ev.detail;
            if (res !== null) {
                this.notifyListeners('jeepCapPhotoViewerExit', res);
            }
        };
        document.addEventListener('jeepPhotoViewerResult', this.jeepPhotoViewerResult, false);
    }
    async echo(options) {
        return options;
    }
    async show(options) {
        var _a;
        //    return new Promise<capShowResult>( (resolve, reject) => {
        jeepPhotoviewer(window);
        if (Object.keys(options).includes('images')) {
            this._imageList = options.images;
        }
        if (Object.keys(options).includes('options')) {
            this._options = (_a = options.options) !== null && _a !== void 0 ? _a : {};
        }
        if (Object.keys(options).includes('mode')) {
            const mMode = options.mode;
            if (this._modeList.includes(mMode)) {
                this._mode = mMode !== null && mMode !== void 0 ? mMode : 'one';
            }
        }
        if (Object.keys(options).includes('startFrom')) {
            const mStartFrom = options.startFrom;
            this._startFrom = mStartFrom !== null && mStartFrom !== void 0 ? mStartFrom : 0;
        }
        this._photoViewer = document.createElement('jeep-photoviewer');
        this._photoViewer.imageList = this._imageList;
        this._photoViewer.mode = this._mode;
        if (this._mode === 'one' || this._mode === 'slider') {
            this._photoViewer.startFrom = this._startFrom;
        }
        const optionsKeys = Object.keys(this._options);
        let divid;
        if (optionsKeys.length > 0) {
            this._photoViewer.options = this._options;
            if (optionsKeys.includes('divid')) {
                divid = this._options.divid;
            }
            else {
                divid = 'photoviewer-container';
            }
        }
        else {
            divid = 'photoviewer-container';
        }
        this._container = document.querySelector(`#${divid}`);
        // check if already a photoviewer element
        if (this._container != null) {
            const isPVEl = this._container.querySelector('jeep-photoviewer');
            if (isPVEl != null) {
                this._container.removeChild(isPVEl);
            }
            this._container.appendChild(this._photoViewer);
            await customElements.whenDefined('jeep-photoviewer');
            return Promise.resolve({ result: true });
        }
        else {
            return Promise.reject("Div id='photoviewer-container' not found");
        }
    }
    async saveImageFromHttpToInternal(options) {
        console.log('saveImageFromHttpToInternal', options);
        throw this.unimplemented('Not implemented on web.');
    }
    async getInternalImagePaths() {
        throw this.unimplemented('Not implemented on web.');
    }
}
//# sourceMappingURL=web.js.map