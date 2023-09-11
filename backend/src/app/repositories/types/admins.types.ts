import { Admin } from "../../entities/admin";

export namespace AdminsTypes {
  export interface ICreate {
    admin: Admin;
  }

  export interface IExists {
    userId: string;
  }
}
