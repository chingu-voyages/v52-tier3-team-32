import BenefitsSection from '@/components/home/BenefitsSection';
import FormSection from '@/components/home/FormSection';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div className='flex flex-col gap-4'>
      <section className="hero-section-background h-96 flex flex-col items-center justify-center gap-5 rounded-xl shadow-lg font-instrumental_sans">
        <h1 className=' font-bold text-4xl text-white'>Power your home with Solar Energy</h1>
        <p className=' text-3xl text-white font-medium'>Join Los Angeles in combating global warming with our solar panel initiative</p>
        <Button className='text-lg dark:bg-white bg-[#202020] text-white dark:text-black h-16 w-44'>Learn more</Button>
      </section>
      <div className='flex gap-7'>
        <BenefitsSection/>
        <FormSection/>
      </div>
    </div>
  );
}

export default HomePage;
