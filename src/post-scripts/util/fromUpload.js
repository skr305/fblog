"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formUpload = void 0;
const qiniu_1 = __importDefault(require("qiniu"));
const qiniu_lib_1 = require("./qiniu-lib");
const formUpload = (file_url, key, definedCallback) => {
    const formUp = new qiniu_1.default.form_up.FormUploader();
    const putExtra = new qiniu_1.default.form_up.PutExtra();
    const defaultCallback = (e, resBody, resInfo) => {
        console.log(e, resBody, resInfo);
    };
    const callback = definedCallback || defaultCallback;
    formUp.putFile((0, qiniu_lib_1.getToken)(), key, file_url, putExtra, callback);
};
exports.formUpload = formUpload;
