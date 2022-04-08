import React, { useEffect } from 'react';
import { AuthNavigator, SidebarNavigator } from './navigators';
import useAuth from './hooks/useAuth';

function Main() {
    //console.disableYellowBox = true;
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
