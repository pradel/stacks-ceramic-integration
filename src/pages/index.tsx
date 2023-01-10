import { Inter } from "@next/font/google";
import { showConnect, UserData } from "@stacks/connect";
import { useEffect, useState } from "react";
import { DIDSession } from "did-session";
import { StacksWebAuth, getAccountId } from "@didtools/pkh-stacks";
import styles from "../styles/Home.module.css";
import { userSession } from "../userSession";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const userData = userSession.loadUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleConnect = () =>
    showConnect({
      userSession,
      appDetails: {
        name: "My App",
        icon: "https://example.com/icon.png",
      },
      onFinish: () => {
        const userData = userSession.loadUserData();
        setUser(userData);
      },
    });

  const handleDisconnect = () => {
    userSession.signUserOut();
    setUser(undefined);
  };

  const handleTest = async () => {
    if (!user) return;

    const stacksProvider = window.StacksProvider;
    const address = user.profile.stxAddress.mainnet;

    const accountId = await getAccountId(stacksProvider, address);
    console.log({ accountId });

    const authMethod = await StacksWebAuth.getAuthMethod(
      stacksProvider,
      accountId
    );
    console.log({ authMethod });

    const session = await DIDSession.authorize(authMethod, {
      resources: ["ceramic://*"],
    });
    console.log({ session });
    // @ts-ignore
    console.log({ signature: session.cacao.s.s });
  };

  return (
    <main className={`${inter.className} ${styles.main}`}>
      {/* User not logged in we show connect button */}
      {!user && <button onClick={handleConnect}>Connect Stacks wallet</button>}

      {/* User logged in we can interact with Ceramic */}
      {user && <button onClick={handleDisconnect}>Disconnect</button>}
      {user && <p>Connected: {user.profile.stxAddress.mainnet}</p>}
      {user && <button onClick={handleTest}>Run test</button>}
    </main>
  );
}
