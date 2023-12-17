import { PropsWithChildren } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider = ({ children }: PropsWithChildren) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
