import React, {
  ComponentType,
  useEffect,
  useState,
} from "https://esm.sh/react";
import { Link } from "./src/app/hooks.tsx";

import { classnames } from "./src/utils/classnames.ts";

import { Head } from "https://deno.land/x/aleph@v0.2.28/mod.ts";

export default function App(
  { Page, pageProps }: { Page: ComponentType<any>; pageProps: any },
) {
  const [isActive, setIsactive] = useState(false);

  const keyPress = (e: any) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const getDocument = () => {
    const { document } = window as any;
    return document;
  };

  const getNav = (): any => {
    return getDocument().getElementById("navbar");
  };

  const getHamburger = (): any => {
    return getDocument().getElementById("hamburger");
  };

  const clickOutside = (e: any) => {
    const nav = getNav();
    const hamburger = getHamburger();
    if (!nav) return;
    if (
      !isActive || (nav && nav.contains(e.target)) || e.target === hamburger
    ) {
      return;
    }
    closeMenu();
  };

  useEffect(() => {
    isActive && openMenu();
    const document = getDocument();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    const { document } = window as any;
    const nav = getNav();
    document.body.classList.add("off-nav-is-active");
    if (nav && nav?.style) {
      nav.style.maxHeight = nav.scrollHeight + "px";
    }
    setIsactive(true);
  };

  const closeMenu = () => {
    const document = getDocument();
    const nav = getNav();
    document.body.classList.remove("off-nav-is-active");
    if (nav && nav?.style) {
      nav.style && (nav.style.maxHeight = null);
    }
    setIsactive(false);
  };

  const scriptSetIsDark = `
    //const shouldSetIsDark = document.cookie.includes('is_dark=1') ? true : document.cookie.includes('is_dark=0') ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
    //if (!shouldSetIsDark) {
    //  document.documentElement.classList.add('lights-off');
    //}
    

    (function () {
      window.addEventListener('load', function () {
        const sr = window.sr = ScrollReveal()
        const body = document.body;
  
        body.classList.add('is-boxed');
        body.classList.add('has-animations');
        body.classList.add('is-loaded');
        
        console.log(body)

        sr.reveal('.feature', {
          duration: 600,
          distance: '20px',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          origin: 'right',
          viewFactor: 0.2
        })
      })
      
    }())
  `;
  return (
    <>
      <main>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,700;1,300;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="./style/style.css" />
          <link rel="stylesheet" href="./style/termynal.css" />
          <link rel="icon" type="image/png" href="/d.png" />
          <title>dyno</title>
        </Head>

        <div className="body-wrap boxed-container">
          <header className="site-header">
            <div className="container">
              <div className="site-header-inner">
                <div className="brand header-brand">
                  <a className="header-logo-link" href="/">
                    <div className="header-logo">
                      <img
                        className="logo"
                        src="/logo.svg"
                        alt="Dyno"
                      />
                    </div>
                  </a>
                </div>

                <button
                  id="hamburger"
                  className="header-nav-toggle"
                  onClick={isActive ? closeMenu : openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>

                <nav
                  id="navbar"
                  className={classnames(
                    "header-nav",
                    isActive ? "is-active" : "",
                  )}
                >
                  <div className="header-nav-inner">
                    <ul className="list-reset text-xs header-nav-right">
                      <li>
                        <Link to="/docs/getting-started">Getting Started</Link>
                      </li>
                      <li>
                        <Link to="/docs">Documentation</Link>
                      </li>
                      <li>
                        <a
                          href="https://github.com/dynoland/dyno"
                          target="_blank"
                        >
                          <span className="screen-reader-text">Github</span>
                          <img
                            width="20"
                            height="20"
                            className="github-gray"
                            src="/github.png"
                          />
                        </a>
                      </li>
                      <li>
                        <a href="https://discord.gg/9XPAM7wnma" target="_blank">
                          <span className="screen-reader-text">Discord</span>
                          <img width="24" height="24" src="/discord-gray.svg" />
                        </a>
                      </li>
                    </ul>
                    {
                      /* <ul className="list-reset header-nav-right">
                      <li>
                        <a
                          className="button button-primary button-wide-mobile button-sm"
                          href="/#0"
                        >
                          Button
                        </a>
                      </li>
                    </ul> */
                    }
                  </div>
                </nav>
              </div>
            </div>
          </header>

          <Page {...pageProps} />

          <footer className="site-footer has-top-divider">
            <div className="container">
              <div className="site-footer-inner">
                <div className="brand footer-brand">
                  <Link to="/">
                    <svg
                      className="logo"
                      data-name="Camada 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1077.12 367.33"
                    >
                      <g id="Elipse_1" data-name="Elipse 1">
                        <circle
                          className="cls-1"
                          cx="121.65"
                          cy="244.75"
                          r="121.65"
                        />
                        <circle
                          className="cls-3"
                          cx="121.65"
                          cy="244.75"
                          r="106.65"
                        />
                      </g>
                      <path
                        id="Caminho_1"
                        data-name="Caminho 1"
                        className="cls-3"
                        d="M265.82,227.72V-2"
                        transform="translate(-38.38 2.03)"
                      />
                      <g id="Elipse_3" data-name="Elipse 3">
                        <circle
                          className="cls-1"
                          cx="653.62"
                          cy="233.89"
                          r="125.5"
                        />
                        <path
                          className="cls-3"
                          d="M581.5,231.87a110.5,110.5,0,0,1,221,0"
                          transform="translate(-38.38 2.03)"
                        />
                      </g>
                      <g id="Elipse_4" data-name="Elipse 4">
                        <circle
                          className="cls-1"
                          cx="948.12"
                          cy="237.39"
                          r="129"
                        />
                        <circle
                          className="cls-3"
                          cx="948.12"
                          cy="237.39"
                          r="114"
                        />
                      </g>
                      <line
                        id="Linha_3"
                        data-name="Linha 3"
                        className="cls-3"
                        x1="543.2"
                        y1="366.39"
                        x2="543.2"
                        y2="233.84"
                      />
                      <line
                        id="Linha_4"
                        data-name="Linha 4"
                        className="cls-3"
                        x1="764.2"
                        y1="366.39"
                        x2="764.2"
                        y2="233.84"
                      />
                      <line
                        id="Linha_3-2"
                        data-name="Linha 3"
                        className="cls-3"
                        x1="357.68"
                        y1="229.24"
                        x2="335.96"
                        y2="260.26"
                      />
                      <line
                        id="Linha_3-3"
                        data-name="Linha 3"
                        className="cls-3"
                        x1="480.08"
                        y1="126.8"
                        x2="317.69"
                        y2="358.72"
                      />
                    </svg>
                  </Link>
                </div>
                <ul className="footer-links list-reset">
                  <li>
                    <a href="https://discord.gg/9XPAM7wnma">Support</a>
                  </li>
                </ul>
                <ul className="footer-social-links list-reset">
                  <li>
                    <a href="https://github.com/dynoland/dyno" target="_blank">
                      <span className="screen-reader-text">Github</span>
                      <img
                        width="16"
                        height="16"
                        src="/github.png"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://discord.gg/9XPAM7wnma" target="_blank">
                      <span className="screen-reader-text">Discord</span>
                      <img width="20" height="20" src="/discord.svg" />
                    </a>
                  </li>
                </ul>
                <div className="footer-copyright">
                  &copy; 2021 Dyno, all rights reserved
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <script
        src="https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js"
      >
      </script>
      <script>{scriptSetIsDark}</script>
    </>
  );
}
