import {persistor, store} from '@/Store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@/Components/Toast';
import ApplicationNavigator from '@/Navigator/Application';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ApplicationNavigator />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast bottomOffset={5} config={toastConfig} />
    </>
  );
}
export default App;
