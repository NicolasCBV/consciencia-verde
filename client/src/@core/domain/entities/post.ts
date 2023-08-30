import { Replace } from "@/utils/replace";

interface IImage {
  URI: string;
  file?: File | null;
}
export interface IPost {
  name: string;
  image: IImage;
  description: string;
  content: string[];
  createdAt: Date;
  updatedAt: Date;
}

type TInput = Replace<
  Replace<Post, { createdAt?: Date }>,
  { updatedAt?: Date }
>;

export class Post {
  private props: IPost;

  constructor(input: TInput) {
    this.props = {
      ...input,
      createdAt: input.createdAt ?? new Date(),
      updatedAt: input.updatedAt ?? new Date()
    };
  }

  // name
  set name(input: string) {
    this.props.name = input;
  }

  get name(): string {
    return this.props.name;
  }

  // image
  set image(input: IImage) {
    this.props.image = input;
  }

  get image(): IImage {
    return this.props.image;
  }

  // description
  set description(input: string) {
    this.props.description = input;
  }

  get description(): string {
    return this.props.description;
  }

  // content
  set content(input: string[]) {
    this.props.content = input
  }

  get content(): string[] {
    return this.props.content;
  }

  // createdAt
  get createdAt(): Date {
    return this.props.createdAt;
  }
  
  // updatedAt
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
