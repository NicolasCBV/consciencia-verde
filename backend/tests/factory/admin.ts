import { Admin } from "@app/entities/admin"
import { randomUUID } from "crypto";

type TOverride = Partial<Admin>;

export function adminFactory(input?: TOverride) {
  return new Admin({
    userId: randomUUID(),
    ...input
  }, input?.id ?? randomUUID());
}
