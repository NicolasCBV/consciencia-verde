import { Admin } from "../../entities/admin";

interface IObject {
  id: string;
  userId: string;
  createdAt: string;
}

export class AdminMapper {
  static toRepresentationalJSON(input: Admin): IObject {
    return {
      id: input.id,
      userId: input.userId,
      createdAt: input.createdAt.toUTCString()
    }
  }

  static toClass({ id, ...admin }: IObject): Admin {
    return new Admin({
      ...admin,
      createdAt: new Date(admin.createdAt)
    }, id);
  }
}
