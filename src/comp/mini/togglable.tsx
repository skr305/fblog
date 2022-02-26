import React from "react";
import { ClearFunction } from '../../type/alias';
import { Chip } from "@mui/material";
import { useCallback } from 'react';

export type OnToggleType = ClearFunction;
export interface TogglableProps {
    count: number;
    toggle?: OnToggleType;
    hasInto: boolean;
    IntoIcon: React.ReactElement;
    OutIcon: React.ReactElement;
};
export const getToggleChangeCount = ( currentValue: boolean ) => currentValue ? 1 : -1;
const Togglable:React.FC<TogglableProps> = ( props: TogglableProps ) => {
    const { count, toggle, hasInto, IntoIcon, OutIcon } = props;
    const onToggle = useCallback( () => {
        if( toggle ) {
            toggle();
        }
    }, [ toggle ] );
    return (
        <div>
            <Chip icon={ hasInto ? IntoIcon : OutIcon } label={count}
            onClick={onToggle}/>
        </div>
    )
};
export default Togglable;