import { Inter } from "@next/font/google";
import { showConnect, UserData } from "@stacks/connect";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { userSession } from "../userSession";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState<UserData>();

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

  useEffect(() => {
    const userData = userSession.loadUserData();
    if (userData) {
      setUser(userData);
    }
  }, []);

  console.log(user);

  return (
    <main className={`${inter.className} ${styles.main}`}>
      {/* User not logged in we show connect button */}
      {!user && <button onClick={handleConnect}>Connect Stacks wallet</button>}

      {/* User logged in we can interact with Ceramic */}
      {user && <p>Connected: {user.profile.stxAddress.mainnet}</p>}
      {user && <button>Connect to Ceramic</button>}
    </main>
  );
}
