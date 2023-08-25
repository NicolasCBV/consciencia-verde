import { PostRepo } from "@app/repositories/post.repository";
import { PostTypes } from "@app/repositories/types/post.types";
import { firestore, storageApp } from "@src/config/firebase/storage";
import { StorageError } from "@infra/errors/StorageError";
import { injectable } from "inversify";

@injectable()
export class FirebaseHandler implements PostRepo {
  async setImage(input: PostTypes.ISetImage) {
    const { file, postId } = input;

    const type = file.mimetype.split("/")[1];
    const formattedName = encodeURIComponent(`${postId}.${type}`);

    const firebaseUrl = process.env.FIREBASE_TEMPLATE_IMAGE_LINK;
    const imageURI = `${firebaseUrl}/${
      encodeURIComponent(`posts/${formattedName}`)
    }?alt=media`;

    const document = firestore.collection("posts").doc(postId);

    document.get().then(async (snapshot) => {
      if(!snapshot.exists)
        throw new StorageError({
          name: "Not Found",
          message: "This entitie doesn't exists.",
          code: 404
        });

      const data = snapshot.data();

      if(!data)
        throw new StorageError({
          name: "Empty Data",
          message: "Empty entitie.",
          code: 500
        });
      
      await document.update({ ...data, imageURI });
    })

    const data = storageApp.bucket().file(`posts/${formattedName}`);
    await data.save(file.buffer, {
      contentType: file.mimetype,
    });
  }

  async setContent(input: PostTypes.ISetContent) {
    if(!input.id)
      return (await firestore.collection("posts").add({
        name: input.name,
        description: input.description,
        content: input.content,
        imageURI: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })).id;

    const document = firestore.collection("posts").doc(input.id)
    await document.get().then((snapshot) => {
      if(!snapshot.exists)
        throw new StorageError({
          name: "Not Found",
          message: "This entitie doesn't exists.",
          code: 404
        });

      const { id, ...newData } = input;
      const data = snapshot.data();
      document.update({
        ...data,
        ...newData,
        updatedAt: new Date
      });
    })

    return document.id;
  }

  async deletePost(input: PostTypes.IDelete) {
    const document = firestore.collection("posts").doc(input.id);
    const data = await document.get().then((snapshot) => {
      if(!snapshot.exists)
        throw new StorageError({
          name: "Not Found",
          message: "This entitie doesn't exists.",
          code: 404
        });

      return snapshot.data();
    });

    const imageURI = data?.imageURI; 
    if(typeof imageURI === "string") {
      const regex = /\/posts%2F([a-z0-9.]+)/gmi;
      const file = regex.exec(imageURI);

      if(!file || file.length <= 0)
        throw new StorageError({
          name: "Not Found",
          message: "This entitie doesn't exists.",
          code: 404
        });

      await storageApp.bucket().file(`posts/${file[1]}`).delete();
    }

    await document.delete();
  }
}

