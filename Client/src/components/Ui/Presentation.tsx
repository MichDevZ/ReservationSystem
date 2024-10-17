import { useEffect, useState } from 'react'

const Presentation = () => {

    const [isZoomed, setIsZoomed] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsZoomed(false);
      }, 500); 
  
      return () => clearTimeout(timer); 
    }, []);
  

  return (
    <div className="h-[550px] w-full relative overflow-hidden">
    <img 
      src="portada.webp" 
      alt="Presentación"
      className={`img1 object-center h-full w-full transform transition-transform duration-[8000ms] ease-out ${isZoomed ? 'scale-110' : 'scale-100'}`} 
/>
<div className='absolute inset-0 flex items-center justify-center '>
        <div className='border-2  p-3'>
        <h1 className='text-gray-100 text-3xl font-bold '>Cabañas Del Lago Frutillar</h1>
        <h2 className='text-gray-100 text-1xl font-bold '>Disfruta la paz y la tranquilidad</h2>
        </div>
      </div>
  </div>
);
  
}

export default Presentation
