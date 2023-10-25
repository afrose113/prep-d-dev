import { persistor, store } from "@/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/Components/Toast";
import ApplicationNavigator from "@/Navigator/Application";
import { I18nextProvider } from "react-i18next";
import "@/Translations";
import i18n from "i18next";

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <ApplicationNavigator />
            </I18nextProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast bottomOffset={5} config={toastConfig} />
    </>
  );
}
export default App;
