import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardContent, Chip, CardActions, List, ListItem, Typography, Button } from '@mui/material';
import { BlogComment, SecondaryComment } from '../type/blog/index';
import Thumb from "./mini/thumb";
import SingleSubmitable from "./mini/single-submitable";
import { useState } from 'react';

interface CommentDisplayProps {
    onToggleThumb: ( idx: number ) => any;
    onReply?: ( idx:number, content: string ) => any;
    onToggleSecondaryThumb?: ( idx: number, secondaryIdx: number ) => any;
    data: Array<BlogComment>;
    disableReply?: boolean;
};
const CommentDisplay:React.FC<CommentDisplayProps> = ( props: CommentDisplayProps ) => {
    const { onToggleThumb, data } = props;
    let disableReply = props.disableReply === undefined ? false : props.disableReply;
    let onReply 
    :( idx:number, content: string ) => any = 
    props.onReply ? props.onReply : ( idx: number, content: string ) => {};
    const [ showReply, setShowReply ] = useState<boolean>( false );
    return (
        <div>
            <List>
                {
                    data.map( (com, idx) => {
                        return ( 
                            <ListItem key={com.ID}>
                                <Card>
                                    <CardContent>
                                        <Chip label={com.authorNick}/>
                                        <Typography component={"h5"}> { com.content } </Typography>
                                        <Typography component={"h6"}> { com.postDate } </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Thumb thumbCount={com.thumbCount}
                                        hasThumbed={com.hasThumbed}
                                        toggleThumb={ () => { onToggleThumb(idx); } }/>
                                        {
                                            disableReply ?
                                            <></> :
                                            <React.Fragment>
                                                <SingleSubmitable onSubmit={ ( value: string ) => 
                                                    onReply( idx, value ) }/>
                                                <Button onClick={() => { 
                                                    setShowReply( !showReply );
                                                }}> 
                                                    { showReply ? "隐藏回复" : "查看回复" }
                                                </Button>
                                            </React.Fragment>   
                                        }
                                    </CardActions>
                                    {
                                        (() => {
                                            // format the secondary comments to adapt and reuse the component
                                            const formatReplys = com.replys.map( (r, rIdx) => {
                                                return { ...r, replys: [] }
                                            } );
                                            return (
                                                showReply && !disableReply ?
                                                <CommentDisplay data={formatReplys}
                                                onToggleThumb={
                                                    ( secondaryIdx: number ) => 
                                                    props.onToggleSecondaryThumb ?
                                                    props.onToggleSecondaryThumb( idx, secondaryIdx ) : {}
                                                }
                                                /> 
                                                : <></>
                                            )
                                        })()
                                        
                                    }
                                    {/* this should push into the up "{}" */}
                                </Card>
                            </ListItem> 
                        )
                    })
                }
            </List>
        </div>
    )
};
export default CommentDisplay;