import { Post } from "@/@core/domain/entities/post";
import { Timestamp } from "firebase/firestore";

export interface IFirestorePostObject {
  name: string;
  imageURI: string;
  description: string;
  content: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IIncomingFirebasePostData {
  imageURI: string;
  name: string;
  description: string;
  content: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class FirestorePostMapper {
  static format(input: IIncomingFirebasePostData): IFirestorePostObject {
    return {
      name: input.name,
      description: input.description,
      imageURI: input.imageURI,
      content: input.content,
      createdAt: input.createdAt.toDate(),
      updatedAt: input.updatedAt.toDate()
    }
  }

  static toObject(input: Post): IFirestorePostObject {
    return {
      name: input.name,
      imageURI: input.image.URI,
      description: input.description,
      content: input.content,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    }
  }

  static toClass(input: IFirestorePostObject): Post {
    return new Post({
      name: input.name,
      description: input.description,
      content: input.content,
      image: {
        URI: input.imageURI
      },
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    });
  }
}
