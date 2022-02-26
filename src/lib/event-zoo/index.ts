import { EventEmitter } from "events";
import { setSession, getSession } from './util/storage';

const bus = new EventEmitter();
const getZooCacheKey = ( eventType: string ) => `ZooCacheHello-${ eventType }`;
export const eventZooEmit = <P, C>( eventType: string, params: P, caches?: C ) => {
    bus.emit( eventType, params );
    if( caches ) {
        setSession( getZooCacheKey( eventType ), caches );
    }
};
export const eventZooOn = <P>( eventType: string, eventCallback: ( p:P ) => any ) => {
    bus.on( eventType, eventCallback );
}
// this eventType could be listened by only one 
export const eventZooSingleOn = <P>( eventType: string, eventCallback: ( p:P ) => any ) => {
    if( bus.eventNames().includes( eventType ) ) {
        bus.removeAllListeners( eventType );
    }
    bus.on( eventType, eventCallback );
}
export const eventZooCache = <C>( eventType: string ): C | null => {
    return getSession<C>( getZooCacheKey( eventType ) );
}