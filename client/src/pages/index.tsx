import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Start } from '@/components/Home/Start';
import { About } from '@/components/Home/About';
import { Contacts } from '@/components/Home/Contacts';
import { GradientLine } from '@/components/common/GradientLine';

function Home () {
  return (
    <div className="grid w-screen min-h-screen relative">
      <Header/>
      <main className="grid place-items-center place-content-center w-screen min-h-screen gap-24">
        <Start/> 
        <About/>
        <GradientLine/>
        <Contacts/>
        <GradientLine/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home;
