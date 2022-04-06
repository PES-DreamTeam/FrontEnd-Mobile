import React, { useEffect } from 'react';
import { AuthNavigator, SidebarNavigator } from './navigators';
import useAuth from './hooks/useAuth';

function Main() {
    const { isSignedIn, auth } = useAuth();
    useEffect(()=>{},[auth])
    

    if(auth.user === null || auth.user === undefined) return <AuthNavigator/>
    return(
        !isSignedIn() ?(
            <AuthNavigator/>
        ) : ( 
            <SidebarNavigator/>
        )
    )
}

export { Main }
