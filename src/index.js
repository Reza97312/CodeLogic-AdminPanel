// ** React Imports
import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// ** Redux Imports
import { store } from "./redux/store";
import { Provider } from "react-redux";

// ** React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ** ThemeColors Context
import { ThemeContext } from "./utility/context/ThemeColors";

// ** ThemeConfig
import themeConfig from "./configs/themeConfig";

// ** Toast
import { Toaster } from "react-hot-toast";

// ** Spinner
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import "./@fake-db";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

// *** ADD QUERY CLIENT ***
const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <ThemeContext>
            <LazyApp />
            <Toaster
              position={themeConfig.layout.toastPosition}
              toastOptions={{ className: "react-hot-toast" }}
            />
          </ThemeContext>
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

serviceWorker.unregister();
