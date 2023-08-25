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

  get name(): string {
    return this.props.name;
  }

  get image(): IImage {
    return this.props.image;
  }

  get description(): string {
    return this.props.description;
  }

  get content(): string[] {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
