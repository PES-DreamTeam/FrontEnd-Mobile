import React, { useEffect } from 'react';
import { AuthNavigator, SidebarNavigator } from './navigators';
import useAuth from './hooks/useAuth';

function Main() {
    const { isSignedIn, auth } = useAuth();
    useEffect(()=>{},[auth])

    return(
        !isSignedIn() ?(
            <AuthNavigator/>
        ) : ( 
            <SidebarNavigator/>
        )
    )
}

export { Main }
