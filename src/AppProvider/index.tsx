import React, {useMemo, useState} from 'react';
import {
  InteractionManager,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Toast from 'react-native-toast-message';
import {CustomToast} from '@components';

type AppContextValue = {
  isGlobalLoading: boolean;
  loadingText: string;
  showFlashMessage: (
    position?: 'top' | 'center' | 'bottom',
    extra?: Record<string, unknown>,
  ) => void;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
};

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

export const AppConsumer = AppContext.Consumer;

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');

  const showLoader = (text?: string) => {
    setLoadingText(text ?? '');
    setIsGlobalLoading(true);
  };

  const hideLoader = () => {
    InteractionManager.runAfterInteractions(() => {
      setIsGlobalLoading(false);
      setLoadingText('');
    });
  };

  const _showFlashMessage = (
    position: 'top' | 'center' | 'bottom' = 'top',
    extra: Record<string, unknown> = {},
  ) => {
    let message = {
      position,
      ...extra,
    } as Record<string, unknown>;
    message = {...message, floating: true};
    // @ts-expect-error react-native-flash-message types are broad
    showMessage(message);
  };
  // Note: automatic fetch-based loader has been removed. Use showLoader/hideLoader manually.

  const contextValue = useMemo<AppContextValue>(
    () => ({
      isGlobalLoading,
      loadingText,
      showFlashMessage: _showFlashMessage,
      showLoader,
      hideLoader,
    }),
    [isGlobalLoading, loadingText],
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      {/* Global toasts */}
      <Toast config={CustomToast} />
      <FlashMessage position="top" animated />

      {/* Global loading overlay */}
      {isGlobalLoading && (
        <View style={styles.overlay} pointerEvents="auto">
          <View style={styles.loaderCard}>
            <ActivityIndicator size="large" color="#0088CC" />
            {loadingText ? (
              <Text style={styles.loaderText}>{loadingText}</Text>
            ) : null}
          </View>
        </View>
      )}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  loaderCard: {
    minWidth: 140,
    minHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginTop: 12,
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
