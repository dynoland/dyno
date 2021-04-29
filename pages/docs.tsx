import React, { ComponentType, Fragment } from "https://esm.sh/react";
import { Head } from "https://deno.land/x/aleph@v0.2.28/mod.ts";
import { useRouter } from "https://deno.land/x/aleph@v0.3.0-alpha.32/framework/react/mod.ts";
import { Link } from "../src/app/hooks.tsx";

interface Metadata {
  title: string;
  author: string;
  date: string;
}

const menu = [
  {
    name: "Documentation",
    items: [
      { name: "About Dyno", path: "/docs" },
      { name: "Getting Started", path: "/docs/getting-started" },
      { name: "Commands", path: "/docs/commands" },
      { name: "Dyno file", path: "/docs/dyno_json" },
      { name: "Dependencies", path: "/docs/dependencies" },
      { name: "Scripts", path: "/docs/scripts" },
    ],
  },
];

export default function Docs(
  { Page }: {
    Page: ComponentType & { meta: Metadata };
    pageProps: any;
  },
) {
  const { routePath } = useRouter();

  return (
    <>
      <Head>
        <title>{Page.meta.title || "dyno"}</title>

        <link rel="stylesheet" href="../style/docs.css" />
      </Head>
      <main id="docs">
        <aside>
          <nav>
            {menu.map(({ name, items }, index) => (
              <Fragment key={name + index}>
                <h2>{name}</h2>
                <ul>
                  {items.map((
                    { name: itemName, path: itemPath },
                    itemIndex,
                  ) => (
                    <li
                      key={itemName + itemIndex}
                      className={routePath === itemPath ? "active" : ""}
                    >
                      <Link to={itemPath}>
                        <>❯{routePath === itemPath && "_"} {itemName}</>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </nav>
        </aside>
        <div className="content">
          <Page />
        </div>
      </main>
    </>
  );
}
