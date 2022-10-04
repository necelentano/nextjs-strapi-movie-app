import { useFetchUser, UserProvider } from "../lib/authContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const user = useFetchUser();
  return (
    <UserProvider value={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
