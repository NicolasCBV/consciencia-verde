import { Replace } from "@src/utils/replace";
import { randomUUID } from "crypto";

interface IProps {
  userId: string;
  createdAt: Date;
} 

type TInput = Replace<
  IProps,
  { createdAt?: Date }
>

export class Admin {
  private readonly props: IProps;
  private readonly _id: string;

  constructor(input: TInput, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...input,
      createdAt: input.createdAt ?? new Date
    };
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
