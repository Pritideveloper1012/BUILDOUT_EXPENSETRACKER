import { SnackbarProvider } from "notistack";
import React from "react";
import AppContent from "./Components/AppContent";



export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <AppContent />
    </SnackbarProvider>
  );
}