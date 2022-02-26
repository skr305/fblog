const FAKE_REQUEST_DELAY = 500; //ms
export const fakeSuccessRequest = <T>( fakeResponse: T, delay: number = FAKE_REQUEST_DELAY ):Promise<T> => {
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve( fakeResponse );
        }, delay );
    } )
}