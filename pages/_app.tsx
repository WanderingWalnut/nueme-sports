import { AuthContextProvider } from '@/context/AuthContext';
import '@/app/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    );
}