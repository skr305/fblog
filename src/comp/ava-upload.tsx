import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { QINIU_SERVER,  QINIU_BUCKET_URL } from '../api/upload/qiniu-util';
import { Modal, Box } from '@mui/material';
import useModal from '../hooks/use-modal';
import { useEffect } from 'react';
import moment from 'moment';
import { DEFAULT_UPLOAD_TOKEN_TIME } from '../constants/upload-token-time';
import { UploadMetaType } from '../api/interface';

export interface AvaUploadProps {
    onFillUpload: ( img_url: string ) => any;
    onUploadFail?: ( mark: AvaUploadFailEnum ) => any;
};
export interface HashResponse {
    hash?: string;
};
export enum AvaUploadFailEnum {
    HASH_NO_FOUND = 0,
    NETWORK_ERROR = 1
};
export const getUploadToken = async ():Promise<UploadMetaType> => {
    return { token: "", key: "" };
}
const AvaUpload: React.FC< AvaUploadProps > = ( props: AvaUploadProps ) => {
    const MAX_UPLOAD_COUNT = 1;
    const [ fileList, setFileList ] = useState<Array<UploadFile>>( [] );
    const [ token, setToken ] = useState<string>( "" );
    const [ previewImage, setPreviewImage ] = useState<string>( "" );
    const [ inPreview, , openPreview, closePreview ] = useModal( false );
    const [ tokenStartTime, setTokenStartTime ] = useState( new Date() );
    const [ tokenAvailable, setTokenAvailable ] = useState( false );
    // also the final file uri/key, to position this file by `${bucket_url}/key`
    const [ uploadKey, setUploadKey ] = useState( "" );
    const initUploadToken = async () => {
        // if the token load Error 
        // get on a tip
        // and give a disable button
        try {
            const uploadMeta = await getUploadToken();
            setToken( uploadMeta.token );
            setUploadKey( uploadMeta.key );
            setTokenStartTime( new Date() );
            setTokenAvailable( true );
        } catch ( error ) {
            setTokenAvailable( false );
            console.error( "load ava upload token error" );
        }
    }
    useEffect( () => {
        initUploadToken();
    }, [] );
    const beforeUpload = () => {
        // 1h
        if( Math.abs( moment( new Date() ).diff( tokenStartTime, "second" ) ) > DEFAULT_UPLOAD_TOKEN_TIME ) {
            // this time will be thought as a bad upload
            setTokenAvailable( false );
            initUploadToken();
        }
    };
    const onPreview = ( file:UploadFile ) => {
        const url = file?.url || file?.thumbUrl || ""
        setPreviewImage( url );
        openPreview();
    };
    const onChange = ( changeEvent: UploadChangeParam ) => {
        const { file } = changeEvent;
        setFileList( [ file ] );
        // send the url to the backend
        // if the hash is lost, this is a bad upload
        // make some tip
        /** use hash to validate if the img upload done */
        if( file.response?.hash ) {
            const url = `${QINIU_BUCKET_URL}${uploadKey}`;
            props.onFillUpload( url );
        } else {
            if( props?.onUploadFail ) {
                props.onUploadFail( AvaUploadFailEnum.HASH_NO_FOUND );
            }
        }
    };
    const uploadBtn = (
        <div>
            <PlusOutlined/>
        </div>
    );

    return (
        <div>
            <Upload
            maxCount={MAX_UPLOAD_COUNT}
            fileList={ fileList }
            action={ QINIU_SERVER }
            data={ { token, key: uploadKey } }
            beforeUpload={ beforeUpload }
            onPreview={ onPreview }
            accept={"image/*"}
            listType={"picture-card"}
            onChange={onChange}
            >
                { tokenAvailable ? uploadBtn : "按钮不可用*(token缺失)" }
            </Upload>
            <div>
                <Modal
                open={inPreview}
                onClose={closePreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box>
                        <img style={{ width: "100%" }} src={previewImage} alt="previewImg" />
                    </Box>
                </Modal>
            </div>  
        </div>
    )
}
export default AvaUpload;