import { redirect } from "https://deno.land/x/aleph@v0.2.28/mod.ts";
import React, { ComponentType, useCallback } from "https://esm.sh/react";

export function Link(
  { to, children }: {
    to: string;
    children: ComponentType | Element;
  },
) {
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      redirect(to);
    },
    [to],
  );

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}
