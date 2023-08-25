import { adminFactory } from "@tests/factory/admin"
import { InMemoryAdminsCache } from ".";

describe("Create cache admin test", () => {
  let adminRepo: InMemoryAdminsCache;

  beforeEach(() => {
    InMemoryAdminsCache.admins = [];
    adminRepo = new InMemoryAdminsCache();
  });

  it("should be able to test create method on admin", async () => {
    const admin = adminFactory();

    expect(adminRepo.create({ admin })).resolves;
  });

  it("should be able to replace admin data", async () => {
    const admin = adminFactory({ id: "default_id" });

    adminRepo.create({ admin });

    expect(admin.id === InMemoryAdminsCache.admins[0].id).toBeTruthy();
    expect(admin.userId === InMemoryAdminsCache.admins[0].userId).toBeTruthy();
    expect(admin.createdAt === InMemoryAdminsCache.admins[0].createdAt).toBeTruthy();

    const newAdmin = adminFactory({
      id: "default_id",
      userId: "new user id"
    });

    adminRepo.create({ admin: newAdmin });
    expect(newAdmin.userId === InMemoryAdminsCache.admins[0].userId).toBeTruthy();
  })
})

