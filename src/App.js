import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

const queryClient = new QueryClient(); 

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-center" toastClassName="font-toast" />    
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App
