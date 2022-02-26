import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoadingFrameProps {

};
const LoadingFrame:React.FC<LoadingFrameProps> = () => {
    return (
        <div>
            <Typography component="h2"> qvq加载... </Typography>
            <CircularProgress color="secondary"/>
        </div>
    )
};
export default LoadingFrame;