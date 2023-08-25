import Image from "next/image";

import { ArrowLeft, ArrowRight } from "phosphor-react";

interface props {
  comments: {
      userName: string
      photo: string,
      comment: string
  }[],
  commentState: number,
  setCommentState: (data: number) => void
}

export function Reputation({ 
  comments, 
  commentState, 
  setCommentState 
}: props) {
  return (
    <div className="grid text-center mb-16 tablet:max-w-[40rem] place-self-center tablet:gap-14">

        <div 
          id="text"
          className="mb-8 w-[70vw] place-self-center tablet:max-w-[40rem]"
        >
          <h1
            className="py-4 text-2xl tablet:text-md"
          >
            Nossa reputação
          </h1>
          <p className="tablet:text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus voluptatem doloremque dolor quibusdam laboriosam aliquid obcaecati recusandae sint. Dolore libero aut obcaecati reprehenderit possimus minima, alias quasi illum nesciunt neque!
          </p>
        </div>

        <div 
          id="comment"
          className="border-primaryColor-300 border-2 rounded-2xl shadow-lg py-7 px-2 w-[80vw] place-self-center tablet:max-w-[40rem]"
        >
          <blockquote>
            <Image
              className="circle"
              src={comments[commentState].photo}
              alt="photo"
              height={"60"}
              width={"60"}
            />
            <p className="tablet:text-sm">
              {comments[commentState].comment}
            </p>
            <div 
              id="switchUser"
              className="flex justify-between"
            >
              <button
                onClick={()=>{
                  if(commentState <= 0) 
                    return setCommentState(comments.length - 1)
                  setCommentState(commentState - 1)
                }}
              >
                <ArrowLeft color="black"/>
              </button>
              <button
                onClick={()=>{
                  if(commentState >= comments.length - 1)
                    return setCommentState(0)
                  setCommentState(commentState + 1)
                }}
              >
                <ArrowRight color="black"/>
              </button>
            </div>
          </blockquote>
        </div>

      </div>
  )
}