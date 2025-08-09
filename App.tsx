import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './src/context/AuthContext';
import {RootNavigator} from './src/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from '@app/theme/ThemeProvider';
import {AppProvider} from '@app/AppProvider';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <ThemeProvider>
          <AppProvider>
            <AuthProvider>
              <RootNavigator />
            </AuthProvider>
          </AppProvider>
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
