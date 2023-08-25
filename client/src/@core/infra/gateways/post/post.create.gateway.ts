import { firestore, storage } from "@/@core/config/firebase.config";
import { Post } from "@/@core/domain/entities/post";
import { PostGateway } from "@/@core/domain/gateways/post.gateway";
import { PostGatewayTypes } from "@/@core/domain/gateways/types/post.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { FirestorePostMapper, IFirestorePostObject } from "../../mappers/firebase/firestore/post";

interface ISendToStorage {
  file: File;
  name: string;
}

export class CreatePostGateway implements PostGateway.CreatePostGateway {
  private formatPostData(input: Post) {
    const post = FirestorePostMapper.toObject(input);
    post.name = encodeURIComponent(post.name);

    const formattedName = encodeURIComponent(`posts/${post.name}`)
    const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE_TEMPLATE_IMAGE_LINK;
    post.imageURI = `${firebaseUrl}/${formattedName}?alt=media`;

    return post;
  }

  private async sendToFirestore(input: IFirestorePostObject) {
    const document = doc(firestore, "posts", input.name);
    await setDoc(document, input)
      .catch(() => {
        throw new HttpError({
          name: "Unauthorized",
          code: 401,
          message: "Could not send image"
        })
      })
  } 

  private async sendToFirebaseStorage(input: ISendToStorage) {
    const reference = ref(storage, `posts/${input.name}`);
    await uploadBytes(reference, input.file)
      .catch(() => {
        throw new HttpError({
          name: "Unauthorized",
          code: 401,
          message: "Could not send image"
        })
      })
  }

  async create(input: PostGatewayTypes.ICreatePost) {
    if(!input.post.image.file)
      throw new HttpError({
        name: "Bad Request",
        code: 400,
        message: "File field empty."
      })

    const formattedPost = this.formatPostData(input.post); 

    await this.sendToFirestore(formattedPost);
    await this.sendToFirebaseStorage({
      file: input.post.image.file,
      name: formattedPost.name
    });
  }
}

