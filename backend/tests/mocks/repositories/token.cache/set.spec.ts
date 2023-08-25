import { InMemoryTokensCache } from "."

describe("Set token test", () => {
  let inMemoryToken : InMemoryTokensCache;

  beforeEach(() => {
    InMemoryTokensCache.tokens = [];
    inMemoryToken = new InMemoryTokensCache();
  })

  it("should be able to set one token", async () => {
    await inMemoryToken.set({
      id: "default id",
      content: "default content",
      ttl: 1000,
      type: "default type"
    });

    const token = InMemoryTokensCache.tokens[0];

    expect(token.key).toEqual("token:default type.default id");
    expect(token.content).toEqual("default content");
  })

  it("should replace existent token", async () => {
    await inMemoryToken.set({
      id: "default id",
      content: "default content",
      ttl: 1000,
      type: "default type"
    })

    const token = InMemoryTokensCache.tokens[0];

    expect(token.key).toEqual("token:default type.default id");
    expect(token.content).toEqual("default content");

    await inMemoryToken.set({
      id: "default id",
      content: "new content",
      ttl: 1000,
      type: "default type"
    });

    const newToken = InMemoryTokensCache.tokens[0]

    expect(newToken.content).toEqual("new content");
    expect(newToken.key).toEqual("token:default type.default id");
  })
})
