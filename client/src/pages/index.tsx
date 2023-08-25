import { useState, } from 'react';

import { Header } from '../components/common/Header';
import { Start } from "../components/Home/Start";
import { About } from "../components/Home/About";
import { Reputation } from '../components/Home/Reputation';
import { Footer } from '../components/common/Footer';


function Home () {
  const comments = [
    {
      userName: "Diego",
      photo: "https://randomuser.me/api/portraits/men/80.jpg",
      comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto ducimus magnam culpa quam enim delectus, voluptas itaque maxime fuga? Officiis reprehenderit atque tenetur cum, autem rem nihil hic a porro!1"
    },
    {
      userName: "Fernando",
      photo: "https://randomuser.me/api/portraits/men/72.jpg",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quas atque assumenda ipsum praesentium doloremque quae sequi temporibus debitis. Voluptatum autem libero culpa quaerat dolores fugiat vel iusto sed deserunt.2"
    },
    {
      userName: "Arthur",
      photo: "https://randomuser.me/api/portraits/men/82.jpg",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora laborum laudantium magnam deleniti consequuntur, natus hic, illum aperiam ipsa earum iusto consectetur ipsum. Rem repellendus enim esse ducimus, eius laudantium!3"
    }
  ]
  const [ commentState, setCommentState ] = useState<number>(0);
  
  return (
    <div>
      <Header/>
      <main className="grid">
         <div className="grid h-[100vh] gap-24">
            <Start/>
            <About/>
            <Reputation
              comments={comments} 
              commentState={commentState}
              setCommentState={setCommentState}
            />
            <Footer/>
          </div>
      </main>
    </div>
  )
}

export default Home;
