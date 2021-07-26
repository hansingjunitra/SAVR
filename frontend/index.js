/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AppContextProvider } from './src/context/context';

const Index = () => {
    return (
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    )
}

AppRegistry.registerComponent(appName, () => Index);
