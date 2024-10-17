import { useState, useEffect } from 'react';
import CabinCard from "./CabinCard";
import Reserve from "../Reserve/Reserve";
import axios from 'axios';
import { Cabains } from '../../interfaces/Cabains';


const Cabins  =  () => {

  const [cabains, setCabains] = useState<Cabains[]>([]);
  const [cabainId, setCabainId] = useState<number>();

  useEffect( () => {

    const fechtData = async () => {

     const {data} = await axios.get('http://localhost:5000/api/cabains')
     setCabains(data)
    } 
    
    fechtData();
  }, []);

  const [reserveIsActive, setReserveIsActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);


  const activeReserve = (id: number) => {
    setIsTransitioning(true);
    setCabainId(id)

    setTimeout(() => {
      setReserveIsActive(!reserveIsActive);
      setIsTransitioning(false); 
    }, 1000); 
  };

  const activeReserve2 = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setReserveIsActive(!reserveIsActive);
      setIsTransitioning(false); 
    }, 1000); 
  };

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="w-[300px] italic font-bold text-white rounded-lg 
          p-4 border border-orange-500 hover:bg-orange-500 ">
          <h1 className="text-xl">Cabañas</h1>
        </div>
      </div>


        {reserveIsActive ? (
          <div className={`transition-all duration-500 ease-in-out
          ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <Reserve handleClick={activeReserve2} cabainId={cabainId!} />
          </div>
        ) :  (

          <div
          className={`grid grid-cols-3 justify-items-center gap-y-4 
          transition-all duration-500 ease-in-out 
          ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          {cabains!.map((cabain, index) => (
            <div
              key={cabain.id}
              className={`col-span-1 ${
                (index % 3 === 0 && cabains!.length - index < 3) ? 'col-span-full justify-self-center' : ''
              }`}
            >
              <CabinCard handleClick={() => activeReserve(cabain.id)} Cabain={cabain} />
            </div>
          ))}
        </div>
        )
        
        }

    </>
  );
};

export default Cabins;
