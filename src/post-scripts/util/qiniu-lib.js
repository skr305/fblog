var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.QINIU_SERVER = exports.QINIU_BUCKET = exports.QINIU_AK = void 0;
const qiniu_1 = __importDefault(require("qiniu"));
exports.QINIU_AK = "TuOmB9uN5CSjLdwBYdAQnJhgYl-vryNR7JS73KpV";
const QINIU_SK = "jhHwrGp-rL_OCZA6vUpNrSBewaWuwPNl_qAoWfCE";
exports.QINIU_BUCKET = "lll4312";
exports.QINIU_SERVER = "http://upload.qiniup.com";
const getToken = () => {
    const mac = new qiniu_1.default.auth.digest.Mac(exports.QINIU_AK, QINIU_SK);
    const options = {
        scope: exports.QINIU_BUCKET,
        callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };
    const putPolicy = new qiniu_1.default.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
};
exports.getToken = getToken;
