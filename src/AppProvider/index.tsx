import { CustomToast } from '@components';
import React, { Component, useState } from 'react';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Toast from 'react-native-toast-message';
import { InteractionManager } from 'react-native';




const AppContext = React.createContext({});

export const AppConsumer = AppContext.Consumer;
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [textLoading, setTextLoading] = useState('');
    
    const _showFlashMessage = (position = 'top', extra: any = {}) => {
        let message = {
            position,
            ...extra
        };

        message = { ...message, floating: true };

        showMessage(message);
    };
    const hideProgress = () => {
        InteractionManager.runAfterInteractions(() => {
            if (loading) {
                setLoading(false);
                if (textLoading && textLoading.length > 0) {
                    setTextLoading('');
                }
            }
        });
    };
    const showProgress = (textLoading: string) => {
        let _text = textLoading || '';
        setLoading(true);
        setTextLoading(_text);
    };
    const _loggout = () => {
        //logout
    };
    const funcs = {
        showFlashMessage: _showFlashMessage,
        showLoader: showProgress,
        hideLoader: hideProgress,
        loggout: _loggout
    };

    return (
        <AppContext.Provider value={{ ...funcs }}>
            {children}
            
            <Toast config={CustomToast} />
            <FlashMessage position="top" animated />
        </AppContext.Provider>
    );
};
