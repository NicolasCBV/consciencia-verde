import { IPostObject } from "../post";

export interface IAlgoliaHitObject {
  name: string;
  content: string[];
  description: string;
  imageURI: string;
  objectID: string;
  path: string;
}

export class AlgoliaHitMapper {
  static format(input: IAlgoliaHitObject): IPostObject {
    return {
      name: input.name,
      description: input.description,
      content: input.content,
      image: {
        URI: input.imageURI
      },
      createdAt: new Date(0).toUTCString(),
      updatedAt: new Date(0).toUTCString()
    }
  }
}
