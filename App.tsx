import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import NavRoot from './src/app/navigators/NavRoot';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/theme/utils/useAppTheme';
import {THEME} from './src/theme/theme-base.ts';
import {themeRef} from './src/theme/refs';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/store/configureStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {navigationRef} from './src/app/navigators/refs';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  let store = useRef<
    ReturnType<typeof configureStore>['configuredStore'] | null
  >(null);

  let persistor = useRef<
    ReturnType<typeof configureStore>['configuredPersistor'] | null
  >(null);

  const [storeInitialized, setStoreInitialized] = useState(false);

  const initializeStore = useCallback(() => {
    try {
      const {configuredStore, configuredPersistor} = configureStore();
      store.current = configuredStore;
      persistor.current = configuredPersistor;
      setStoreInitialized(true);
    } catch (e) {
      setStoreInitialized(false);
      throw new Error('Error initializing store' + e);
    }
  }, []);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (!storeInitialized) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {storeInitialized && store.current && persistor.current ? (
        <Provider store={store.current}>
          <PersistGate persistor={persistor.current} loading={null}>
            <GestureHandlerRootView style={{flex: 1}}>
              <SafeAreaProvider>
                <ThemeProvider value={THEME} themeRef={themeRef as any}>
                  <NavigationContainer ref={navigationRef}>
                    <NavRoot />
                  </NavigationContainer>
                </ThemeProvider>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      ) : (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      )}
    </>
  );
}

export default App;
const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
