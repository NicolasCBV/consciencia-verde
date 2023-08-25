import { InMemoryAdmins } from "../mocks/repositories/admins";
import { InMemoryAdminsCache } from "../mocks/repositories/admins.cache";
import { InMemoryTokensCache } from "../mocks/repositories/token.cache";
import { appTest } from "./define-app-test";

appTest.server.stop()
  .then(() => {
     InMemoryAdmins.admins = [];
     InMemoryAdminsCache.admins = [];
     InMemoryTokensCache.tokens = [];
  })
