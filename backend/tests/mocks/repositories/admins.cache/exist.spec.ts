import { adminFactory } from "@tests/factory/admin"
import { InMemoryAdminsCache } from ".";

describe("Exist cache admin test", () => {
  let adminRepo: InMemoryAdminsCache;

  beforeEach(() => {
    adminRepo = new InMemoryAdminsCache();
  });

  it("should be able to test exist method on admin", async () => {
    const admin = adminFactory();
    InMemoryAdminsCache.admins.push(admin);

    expect(adminRepo.exist({ userId: admin.userId })).toBeTruthy();
  })
})

