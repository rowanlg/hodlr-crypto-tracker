import React from "react";
import Link from "next/link";
import styled from "styled-components";
import colours from "../components/colours";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";

const MainLayout = styled.main`
  width: 100vw;
  /* font-family: "Montserrat", sans-serif; */
  .top-bar {
    background-color: ${colours.mainBlue};
    width: calc(100% - 18vw);
    height: 100px;
    left: 18vw;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-section {
      /* border: 1px solid yellow; */
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .right-section {
      /* border: 1px solid yellow; */
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 65%;
      padding-right: 30px;
      .search-section {
        display: flex;
        align-items: center;
        svg {
          transform: translate(35px, 1px);
          height: 20px;
        }
        .search-bar {
          border: 1px solid ${colours.deactivatedWhite};
          background-color: inherit;
          width: 300px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          opacity: 0.5;
          padding: 10px 10px 10px 40px;
          font-size: 1rem;
          font-weight: 200;
          :focus {
            opacity: 1;
            border: 1px solid ${colours.deactivatedWhite};
            outline: none;
          }
        }
      }

      .account-info {
        /* border: 1px solid purple; */
        button {
          background-color: ${colours.darkBlue};
          border: none;
          padding: 7px 13px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .side-bar {
    background-color: ${colours.mainBlue};
    height: 100vh;
    width: 18vw;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    div:nth-child(1) {
      margin-top: 10px;
      h1 {
        text-align: center;
      }
    }

    ul {
      /* border: 1px solid yellow; */
      list-style: none;
      padding-left: 0;
      margin-top: 50px;
      li {
        margin: 20px 0;
        /* border: 1px solid yellow; */
        border-radius: 10px;
        width: 200px;
        a.side-link {
          display: flex;
          align-items: center;
        }
        svg {
          width: 50px;
        }
        svg,
        p {
          padding: 0 4px;
        }
      }
    }
    div {
      /* border: 1px solid yellow; */
    }
  }
  .main-content {
    /* border: 1px solid green; */
    background-color: ${colours.darkBlue};
    width: 100%;
    height: calc(100vh - 100px);
    z-index: 10;
    position: absolute;
    top: 100px;
    left: 18vw;
    width: 82vw;
  }
`;

export default function Layout({ children, pageName }) {
  const [searchFocus, setSearchFocus] = React.useState(false);
  const [token, setToken] = React.useContext(UserContext);
  const router = useRouter();

  return (
    <MainLayout>
      <div className="top-bar">
        <div className="left-section">{/* <h2>{pageName}</h2> */}</div>
        <div className="right-section">
          {/* <div className="search-section">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z"
                fill="#9E9E9E"
                fillOpacity={searchFocus ? 1 : 0.5}
              />
            </svg>
            <input
              className="search-bar"
              type="text"
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </div> */}
          <div className="account-info">
            <button
              onClick={() => {
                localStorage.setItem("usertoken", null);
                setToken(null);
                router.push("/login");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="side-bar">
        <div>
          <h1>
            hodlr<span style={{ color: colours.green }}>.</span>
          </h1>
          <ul>
            {/* <li
              style={{
                backgroundColor:
                  pageName == "Dashboard" ? colours.darkBlue : colours.mainBlue,
              }}
            >
              <Link href="/">
                <a className="side-link">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="11"
                      height="11"
                      rx="3"
                      fill={
                        pageName == "Dashboard"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                    <rect
                      x="14"
                      width="11"
                      height="11"
                      rx="3"
                      fill={
                        pageName == "Dashboard"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                    <rect
                      x="14"
                      y="14"
                      width="11"
                      height="11"
                      rx="3"
                      fill={
                        pageName == "Dashboard"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                    <rect
                      y="14"
                      width="11"
                      height="11"
                      rx="3"
                      fill={
                        pageName == "Dashboard"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                  </svg>
                  <p
                    style={{
                      color:
                        pageName == "Dashboard"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite,
                    }}
                  >
                    Dashboard
                  </p>
                </a>
              </Link>
            </li> */}
            <li
              style={{
                backgroundColor:
                  pageName == "Investments"
                    ? colours.darkBlue
                    : colours.mainBlue,
              }}
            >
              <Link href="/investments">
                <a className="side-link">
                  <svg
                    width="25"
                    height="22"
                    viewBox="0 0 25 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5195 4.6875H3.90625C3.47461 4.6875 3.125 4.33789 3.125 3.90625C3.125 3.47461 3.47461 3.125 3.90625 3.125H22.6562C23.0879 3.125 23.4375 2.77539 23.4375 2.34375C23.4375 1.04932 22.3882 0 21.0938 0H3.125C1.39893 0 0 1.39893 0 3.125V18.75C0 20.4761 1.39893 21.875 3.125 21.875H22.5195C23.8877 21.875 25 20.8237 25 19.5312V7.03125C25 5.73877 23.8877 4.6875 22.5195 4.6875ZM20.3125 14.8438C19.4497 14.8438 18.75 14.144 18.75 13.2812C18.75 12.4185 19.4497 11.7188 20.3125 11.7188C21.1753 11.7188 21.875 12.4185 21.875 13.2812C21.875 14.144 21.1753 14.8438 20.3125 14.8438Z"
                      fill={
                        pageName == "Investments"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                  </svg>
                  <p
                    style={{
                      color:
                        pageName == "Investments"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite,
                    }}
                  >
                    Investments
                  </p>
                </a>
              </Link>
            </li>
            <li
              style={{
                backgroundColor:
                  pageName == "Prices" ? colours.darkBlue : colours.mainBlue,
              }}
            >
              <Link href="/prices">
                <a className="side-link">
                  <svg
                    width="15"
                    height="25"
                    viewBox="0 0 15 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2131 11.3965L4.93963 9.85352C4.32928 9.67773 3.90447 9.10645 3.90447 8.47168C3.90447 7.67578 4.549 7.03125 5.3449 7.03125H8.58221C9.17791 7.03125 9.76385 7.21191 10.2521 7.54395C10.55 7.74414 10.9504 7.69531 11.2043 7.44629L12.9035 5.78613C13.2502 5.44922 13.2013 4.8877 12.8156 4.58984C11.6193 3.65234 10.1252 3.12988 8.59197 3.125V0.78125C8.59197 0.351562 8.24041 0 7.81072 0H6.24822C5.81853 0 5.46697 0.351562 5.46697 0.78125V3.125H5.3449C2.23455 3.125 -0.265451 5.7959 0.0226352 8.96484C0.227713 11.2158 1.94646 13.0469 4.11443 13.6816L9.11931 15.1465C9.72967 15.3271 10.1545 15.8936 10.1545 16.5283C10.1545 17.3242 9.50994 17.9688 8.71404 17.9688H5.47674C4.88103 17.9688 4.2951 17.7881 3.80681 17.4561C3.50896 17.2559 3.10857 17.3047 2.85467 17.5537L1.15545 19.2139C0.808768 19.5508 0.857596 20.1123 1.24334 20.4102C2.43963 21.3477 3.93377 21.8701 5.46697 21.875V24.2188C5.46697 24.6484 5.81853 25 6.24822 25H7.81072C8.24041 25 8.59197 24.6484 8.59197 24.2188V21.8652C10.8674 21.8213 13.0012 20.4688 13.7531 18.3154C14.8029 15.3076 13.0402 12.2217 10.2131 11.3965V11.3965Z"
                      fill={
                        pageName == "Prices"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite
                      }
                    />
                  </svg>
                  <p
                    style={{
                      color:
                        pageName == "Prices"
                          ? colours.smoothWhite
                          : colours.deactivatedWhite,
                    }}
                  >
                    Prices
                  </p>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div>{/* <p>Dark Mode</p> */}</div>
      </div>
      <div className="main-content">{children}</div>
    </MainLayout>
  );
}
