import { InMemoryTokensCache } from "../mocks/repositories/token.cache";
import { appTest } from "./define-app-test";

appTest.server.stop()
  .then(() => {
     InMemoryTokensCache.tokens = [];
  })
