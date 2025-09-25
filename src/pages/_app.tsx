import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Navbar } from "@/widgets/Navbar";
import type { AppProps } from "next/app";
import "@/app/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider initialState={pageProps.initialReduxState}>
            <ThemeProvider>
                <Navbar />
                <Component {...pageProps} />
            </ThemeProvider>
        </StoreProvider>
    );
}