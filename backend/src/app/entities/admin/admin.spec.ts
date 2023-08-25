import { adminFactory } from "@tests/factory/admin"
import { Admin } from ".";

describe("Admin entitie test", () => {
  it("should be able to create admin entitie", () => {
    const admin = adminFactory();

    expect(admin).toBeInstanceOf(Admin);
  })
})
