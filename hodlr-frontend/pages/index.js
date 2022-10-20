import React from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
// import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const InvestmentPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.3fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 30px 30px;
  padding: 30px;
  grid-template-areas:
    "investment-total liquidity btc-price latest-investments"
    "title buttons buttons latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments";
  /* border: 1px solid green; */
  height: 100%;
  .title {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    h3 {
      margin: 0;
    }
  }
  .buttons {
    grid-column: span 2;
    text-align: right;
  }
`;

// Here you would fetch ACCESS TOKEN and return the user
// const useUser = () => ({ user: null, loading: true });

export default function Page() {
  // const { user, loading } = useUser();
  const [user, setUser] = React.useState(null);
  const router = useRouter();
  const [token, setToken] = React.useContext(UserContext);

  React.useEffect(() => {
    // setToken(localStorage.getItem("username"));
    // console.log(token);
    // if (token == null) {
    //   router.push("/login");
    // }
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(process.env.SERVER_URL + `/api/users/me`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <Layout pageName="Dashboard">
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* <button onClick={() => setToggle(!toggle)}>click</button>
        {showBuys} */}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
}
