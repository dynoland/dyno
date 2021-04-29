import React from "https://esm.sh/react";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">
                  Simple and Fast Package Manager for Deno 🦕
                </h1>
                <p className="hero-paragraph">
                  Builded to make easy and fast applications with multiple
                  dependencies in Deno
                </p>
                <div className="hero-cta">
                  <a
                    className="button button-primary"
                    href="/docs/getting-started"
                  >
                    Getting Started
                  </a>
                </div>
              </div>
              <div className="hero-media">
                <div className="header-illustration">
                  <img
                    className="header-illustration-image asset-light"
                    src="/images/header-illustration-light.svg"
                  />
                  <img
                    className="header-illustration-image asset-dark"
                    src="/images/header-illustration-dark.svg"
                  />
                </div>
                <div className="hero-media-illustration">
                  <img
                    className="hero-media-illustration-image asset-light"
                    src="/images/hero-media-illustration-light.svg"
                  />
                  <img
                    className="hero-media-illustration-image asset-dark"
                    src="/images/hero-media-illustration-dark.svg"
                  />
                </div>
                <div className="hero-media-container">
                  <div
                    id="termynal"
                    className="hero-media-image"
                    data-termynal
                    data-ty-typedelay="60"
                    data-ty-linedelay="1000"
                  >
                    <span data-txt data-ty="input" data-ty-prompt="❯">
                      dyno map
                    </span>
                    <span data-txt data-ty data-ty-prompt="ℹ" data-blue>
                      Mapping dependencies
                    </span>
                    <span data-txt data-ty data-ty-prompt="✔" data-green>
                      Done.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features section">
          <div className="container">
            <div className="features-inner section-inner has-bottom-divider">
              <div className="features-header text-center">
                <div className="container-sm">
                  <h2 className="section-title mt-0">
                    Manage Your Dependencies
                  </h2>
                  <p className="section-paragraph">
                    Dyno dependencies is a easy and lightweight way to manage
                    your project dependendencies and run your scripts.
                  </p>
                  <div className="features-image">
                    <img
                      className="features-illustration asset-dark"
                      src="/images/features-illustration-dark.svg"
                    />
                    <img
                      className="features-box asset-dark"
                      src="/images/features-box-dark.svg"
                    />
                    <img
                      className="features-illustration asset-dark"
                      src="/images/features-illustration-top-dark.svg"
                    />
                    <img
                      className="features-illustration asset-light"
                      src="/images/features-illustration-light.svg"
                    />
                    <div
                      id="termynal-dependencies"
                      className="features-box dependencies code"
                      data-termynal
                      data-ty-typedelay="60"
                      data-ty-linedelay="600"
                    >
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {"{"}
                      </span>
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {`\u00A0\u00A0"oak": "latest",`}
                      </span>
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {`\u00A0\u00A0"nanoid": {`}
                      </span>
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {`\u00A0\u00A0\u00A0\u00A0"version": "latest",`}
                      </span>
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {`\u00A0\u00A0\u00A0\u00A0"paths": {`}
                      </span>
                      <span data-txt data-ty="input" data-ty-prompt="">
                        {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"random": "random.ts"`}
                      </span>
                      <span
                        data-txt
                        data-ty="input"
                        data-ty-prompt=""
                        data-ty-delay="60"
                      >
                        {`\u00A0\u00A0\u00A0\u00A0}`}
                      </span>
                      <span
                        data-txt
                        data-ty="input"
                        data-ty-prompt=""
                        data-ty-delay="60"
                      >
                        {`\u00A0\u00A0}`}
                      </span>
                      <span
                        data-txt
                        data-ty="input"
                        data-ty-prompt=""
                        data-ty-delay="60"
                      >
                        {"}"}
                      </span>
                    </div>
                    <img
                      className="features-illustration asset-light"
                      src="/images/features-illustration-top-light.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="features-wrap">
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <img
                        className="asset-light"
                        src="/images/feature-01-light.svg"
                        alt="Feature 01"
                      />
                      <img
                        className="asset-dark"
                        src="/images/feature-01-dark.svg"
                        alt="Feature 01"
                      />
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title mt-0">
                        Clean configuration
                      </h3>
                      <p className="text-sm mb-0">
                        Forget deps.ts, manage your dependencies with clean
                        code, declare only what is necessary and gain agility in
                        your development
                      </p>
                    </div>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <img
                        className="asset-light"
                        src="/images/feature-02-light.svg"
                      />
                      <img
                        className="asset-dark"
                        src="/images/feature-02-dark.svg"
                      />
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title mt-0">Easy commands</h3>
                      <p className="text-sm mb-0">
                        Manage your project with a few quick commands, forget
                        about having to remember a huge command, dyno scripts
                        keeps it for you, just dedicate yourself to your code.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="feature is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <img
                        className="asset-light"
                        src="/images/feature-03-light.svg"
                      />
                      <img
                        className="asset-dark"
                        src="/images/feature-03-dark.svg"
                      />
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title mt-0">
                        Soon more registrars
                      </h3>
                      <p className="text-sm mb-0">
                        At the moment we only support the deno registry, soon
                        more registries will be available, such{" "}
                        <a href="https://nest.land" target="_blank">
                          nest.land
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta section">
          <div className="container-sm">
            <div className="cta-inner section-inner">
              <div className="cta-header text-center">
                <h2 className="section-title mt-0">
                  Get it and increase your productivity
                </h2>
                <div className="cta-cta">
                  <a
                    className="button button-primary"
                    href="/docs/getting-started"
                  >
                    Getting Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <script
        src="termynal.js"
        data-termynal-container="#termynal|#termynal-dependencies"
      >
      </script>
    </>
  );
}
