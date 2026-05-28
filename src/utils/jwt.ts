import fs from "fs";
import * as jwt from "jsonwebtoken";
import { env } from "./env";

type JwtClaims = {
  sub: string; // userId
  email: string;
};

function readKey(path: string): string {
  return fs.readFileSync(path, "utf8");
}

export function signJwt(claims: JwtClaims): string {
  const privateKeyPem = readKey(env.JWT_PRIVATE_KEY_PATH);
  return jwt.sign(claims, privateKeyPem, {
    algorithm: "RS256",
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });
}

export function verifyJwt(token: string): JwtClaims {
  const publicKeyPem = readKey(env.JWT_PUBLIC_KEY_PATH);
  const payload = jwt.verify(token, publicKeyPem, {
    algorithms: ["RS256"]
  });

  if (typeof payload !== "object" || payload === null) {
    throw new Error("Invalid token payload");
  }

  const { sub, email } = payload as Record<string, unknown>;
  if (typeof sub !== "string" || typeof email !== "string") {
    throw new Error("Invalid token claims");
  }

  return { sub, email };
}

