import { IFormCreateNews } from "@/pages/create-news";
import { Editor, EditorContent } from "@tiptap/react";
import { Article, Envelope, NewspaperClipping, Tag } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/Button";
import { ImageUpdate } from "../common/ImageUpdate";
import { BubbleOptionsMenu } from "./BubbleOptionsMenu";
import { OptionsMenu } from "./Menu";
import { PostForm } from "./PostForm";

interface IProps {
  isError: boolean;
  isLoading: boolean;
  editor: Editor
  image: IFormCreateNews;
  setImage: Dispatch<SetStateAction<IFormCreateNews>>;
  handleSubmit: (form: ICreatePostForm) => void;
}

export interface ICreatePostForm {
  name: string;
  description: string;
}

export function CreateNewsMainFlow({ 
  isError,
  editor,
  image,
  setImage,
  isLoading,
  handleSubmit
}: IProps) {
  const [ form, setForm ] = useState({
    name: "",
    description: ""
  });

  return (
    <>
      <OptionsMenu editor={editor} />
      <ImageUpdate
        icon={NewspaperClipping}
        image={image.URI}
        action={({ image, file }) => {
          setImage({ URI: image, file });
        }}
        className=""
      />
      <PostForm form={form} setForm={setForm} /> 

      <div>
        <EditorContent editor={editor} />
        <BubbleOptionsMenu editor={editor} />
      </div>

      <Button
        disabled={
          isError ||
          isLoading ||
          !image.URI || 
          !image.file ||
          !form.name && form.name.length < 4 ||
          !form.description && form.description.length < 4
        }
        name="Enviar"
        onClick={() => handleSubmit(form)}
        iconData={{
          Icon: Envelope,
          pos: "right",
          loading: isLoading
        }}
      />
    </>
  )
}
