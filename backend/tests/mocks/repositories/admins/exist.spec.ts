import { adminFactory } from "@tests/factory/admin"
import { InMemoryAdmins } from ".";

describe("Exist admin test", () => {
  let adminRepo: InMemoryAdmins;

  beforeEach(() => {
    adminRepo = new InMemoryAdmins();
  });

  it("should be able to test exist method on admin", async () => {
    const admin = adminFactory();
    InMemoryAdmins.admins.push(admin);

    expect(adminRepo.exist({ userId: admin.userId })).toBeTruthy();
  })
})
