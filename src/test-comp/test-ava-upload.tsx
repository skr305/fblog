import AvaUpload from '../comp/ava-upload';
import { AvaUploadFailEnum } from '../comp/ava-upload';
import  React from 'react';
export interface TestAvaUploadProps {

};
const TestAvaUpload:React.FC<TestAvaUploadProps> = ( props: TestAvaUploadProps ) => {
    const imgID = 'testAvaUpload031231';
    const onFillUpload = ( url: string ) => {
        const imgElement = document.getElementById( `${imgID}` ) as HTMLImageElement;
        imgElement.src = url;
    };
    const onUploadError = ( mark: AvaUploadFailEnum ) => {
        console.error( `mark: ${mark}` );
    };
    return (
        <div>
            <img id={imgID} src="" alt=""/>
            <AvaUpload 
            onFillUpload={onFillUpload}
            onUploadFail={onUploadError}
            />
        </div>
    )
};
export default TestAvaUpload;