import React from "react";
import { Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { ThumbUp, Star } from '@mui/icons-material';
import { BlogDisplayMeta } from '../type/blog/index';
interface BlogListItemProps {
    blogMeta: BlogDisplayMeta 
};
const LoadingFrame:React.FC<BlogListItemProps> = ( props: BlogListItemProps ) => {
    const { blogMeta } = props;
    return (
        <Card>
            <CardContent>
                <Typography> { blogMeta.title } </Typography>
                {/* issue: this will be change to the nick of the author  */}
                {/* a interface to checkout the person's info need */}
                <Typography> author: { blogMeta.authorID } </Typography>
                <div> <ThumbUp /> { blogMeta.thumbCount } </div>
                <div> <Star /> { blogMeta.starCount } </div>
            </CardContent>
            <CardActions>
                {  }
            </CardActions>
        </Card>
    )
};
export default LoadingFrame;