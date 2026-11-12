import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "~/routes/-sections/landing-page";

export const Route = createFileRoute("/")({ component: LandingPage });
