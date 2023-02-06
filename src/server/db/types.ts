import type { ColumnType } from "kysely";

export type Decimal = ColumnType<string, string | number, string | number>;

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export interface Account {
  id: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  refresh_token_expires_in: number | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  oauth_token_secret: string | null;
  oauth_token: string | null;
}

export interface Criteria {
  id: Generated<number>;
  name: string;
  weight: Decimal;
  scale: Json | null;
  parentId: number | null;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface User {
  id: string;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Generated<"ADMIN" | "USER" | null>;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface DB {
  Account: Account;
  Criteria: Criteria;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
}
