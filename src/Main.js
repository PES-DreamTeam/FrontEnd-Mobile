import React from 'react';
import { AuthNavigator, SidebarNavigator } from './navigators';
import useAuth from './hooks/useAuth';

function Main() {
    const { isSignedIn } = useAuth();
    return(
        !isSignedIn() ?(
            <AuthNavigator/>
        ) : ( 
            <SidebarNavigator/>
        )
    )
}

export { Main }
