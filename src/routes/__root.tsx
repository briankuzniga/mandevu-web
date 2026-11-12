import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import stylesheet from "~/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Mandevu Beauty Shop | Natural beauty, made for you" },
      {
        name: "description",
        content:
          "Skincare, hair care, makeup and body care for melanin-rich skin, with advice from people who know beauty.",
      },
    ],
    links: [
      { rel: "stylesheet", href: stylesheet },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/claude-favicon.svg",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
