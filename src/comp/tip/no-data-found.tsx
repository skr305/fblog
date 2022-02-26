import { Typography } from '@mui/material';
import * as React from 'react';

interface NoDataFoundProps {

};
const NoDataFound:React.FC<NoDataFoundProps> = ( props: NoDataFoundProps ) => {
  return (
    <div>
        <Typography variant="h6" component="h2">
            qwq暂无数据~
        </Typography>
    </div>
  );
};
export default NoDataFound;