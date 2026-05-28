import morgan from "morgan";
import type { RequestHandler } from "express";

export function requestLogger(format: string | undefined): RequestHandler {
  return morgan(format ?? "dev");
}

