export type ClearFunction = () => any;
export type BooleanControlFunction = ( value: boolean ) => any;
export interface PushableRouter {
    push: ( pathname: string ) => any;
}