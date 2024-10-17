import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IReserve } from '../../interfaces/Reserve';


interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cabainId: number;
}

interface DateDays {
  firstDay : Date | undefined;
  secondDay : Date | undefined;
}

interface IHandleClick {
  handleClick: ({ startDate, endDate }: { startDate: Date | undefined; endDate: Date | undefined }) => void;
}

const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};


const getRemainingMonthsDays = (year: number): { month: number; days: Date[]}[] => {
  const currentMonth = new Date().getMonth(); 
  const monthsData = [];

  for (let month = currentMonth; month < 12; month++) {
    const days = getDaysInMonth(year, month);
    monthsData.push({ month, days });
  }

  return monthsData;
};

const getDaysInRange = (
  start: Date | undefined, 
  end: Date | undefined, 
  reserves: IReserve[] | undefined,
  handleClick: IHandleClick
): Date[] => {
  const daysInRange: Date[] = [];
  if (!start || !end || !reserves) return daysInRange;

  const currentDate = new Date(start);

  while (currentDate <= end) {
    const currentDateString = currentDate.toISOString().split('T')[0];
    daysInRange.push(new Date(currentDate));

    const isNotAvailableRange = reserves.some(r => 
      new Date(r.startDate).toISOString().split('T')[0] === currentDateString
    );


    if (isNotAvailableRange) {
      handleClick.handleClick({startDate: undefined, endDate: undefined})
      return [start];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysInRange;
};


const Reserve: React.FC<Props> = ({ handleClick, cabainId}) => {


  
    useEffect( () => {
  
      const fechtData = async () => {
    
       const {data} = await axios.get('http://localhost:5000/api/reserve/id', {
        params: { id: cabainId }
      })
       setReserves(data)
      } 
      
      fechtData();
    }, []);



  const year = new Date().getFullYear();
  const remainingMonthsDays = getRemainingMonthsDays(year);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDays, setSelectedDays] = useState<DateDays>({
    firstDay: undefined,
    secondDay: undefined
  })
  const [isDataPosted, setIsDataPosted] = useState<Boolean | null>(null)
  const [reserves, setReserves] = useState<IReserve[]>()
  const [error, setError] = useState<boolean>(false)
  const today = new Date(); 

  const handleClickImpl: IHandleClick = {
    handleClick: ({ startDate, endDate }) => {
      setSelectedDays({ firstDay: startDate, secondDay: endDate });
      setError(true)
    }
  };



  const monthsToShow = 2;

  const handleNext = () => {
    if (currentIndex + monthsToShow < remainingMonthsDays.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - monthsToShow <= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  const selectionDays = (day: Date) => {
    setError(false)
    const monthData = remainingMonthsDays.find(date =>
      date.days.some(d => d.getTime() === day.getTime())
    );
  

    if (!monthData) return;
  
    const selectedDay = monthData.days.find(d => d.getTime() === day.getTime());
  
    if (!selectedDay) return;

  
    if (selectedDays.firstDay ) {
      if (selectedDays.secondDay !== undefined ) {
          setSelectedDays({ firstDay: selectedDay, secondDay: undefined });
          return
      }
  
      if (selectedDays.firstDay.getTime() === day.getTime() )  {
        setSelectedDays({ firstDay: undefined, secondDay: undefined });
        return;
      }
  

      if (selectedDay.getTime() < selectedDays.firstDay.getTime()) {
        setSelectedDays({ firstDay: selectedDay, secondDay: selectedDays.firstDay });
        return;
      }
  
 
      setSelectedDays(prevState => ({
        firstDay: prevState.firstDay,
        secondDay: selectedDay
      }));
      return;
    }
  
 
    setSelectedDays({ firstDay: selectedDay, secondDay: undefined });
  };


  const setReserve = async () => {

      const {data} =  await axios.post('http://localhost:5000/api/reserve', {
        cabainId,
        startDate: selectedDays.firstDay,
        endDate: selectedDays.secondDay,
      } )
    
      if (data){
        setIsDataPosted(true)
      }
    
  }

  const daysInRange = getDaysInRange(selectedDays.firstDay, selectedDays.secondDay, reserves, handleClickImpl);



 

  return (
    isDataPosted ? (
      <>
        <div className="transition-opacity duration-[2000ms] ease-in-out opacity-0 animate-fadeIn">
    <div className="grid justify-center place-items-center my-56">
      <div className="svg-container">
        <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
          <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
          <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
        </svg>
      </div>
      
      <p className="text-white text-xl mb-[180px] my-10 font-bold">¡Has reservado con éxito!</p>

      <div className="w-[300px] italic font-bold text-white rounded-lg 
        p-2 border border-orange-500 bg-orange-500 mb-20">
        <button onClick={handleClick} className="text-xl">Volver al inicio</button>
      </div>
    </div>
  </div>
      </>
    ) :
    <>
    <div className={`fixed top-4 right-4 bg-red-500 
    text-white px-4 py-2 rounded shadow-lg ${isDataPosted === false ? '' : 'hidden'}`}>
      Ha ocurrido un error
    </div>

    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-white rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-8 ${currentIndex === 0 ? 'text-gray-400' : 'text-orange-500'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + monthsToShow >= remainingMonthsDays.length}
          className="px-4 py-2 text-white rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-8 ${currentIndex + monthsToShow >= remainingMonthsDays.length ? 'text-gray-400' : 'text-orange-500'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 space-x-10 gap-4">
        {remainingMonthsDays.slice(currentIndex, currentIndex + monthsToShow).map(({ month, days }) => (
          <div key={month} className="mb-4">
            <h2 className="text-xl capitalize mb-5 text-white font-bold">
              {new Date(year, month).toLocaleString('default', { month: 'long' })}
            </h2>
            <div className="grid grid-cols-7 gap-4">
              {days.map((day) => {
                const isPastDateOrReserved = day < today || reserves?.some(r => new Date(r.startDate).toISOString().split('T')[0] === new Date(day).toISOString().split('T')[0]);
                const isInRange = daysInRange.some(d => d.getDate() === day.getDate() && d.getMonth() === day.getMonth());

                return (
                  <button
                    onClick={() => selectionDays(day)}
                    key={day.toISOString()}
                    className={`py-1 text-white border rounded text-center 
                    ${selectedDays.firstDay?.getTime() === day.getTime()  || isInRange ? 'bg-orange-500' : ''}
                      ${isPastDateOrReserved ? 'bg-slate-800 cursor-not-allowed' : 'hover:bg-orange-500'}
                    `}
                    disabled={isPastDateOrReserved }
                  >
                    {day.getDate()}
                    <p className="text-gray-400 text-sm hover:text-white">
                      {isPastDateOrReserved ? 'No Disponible' : 'Disponible'}
                    </p>
                    <p className={`text-gray-400 text-sm hover:text-white
                       ${selectedDays.firstDay || selectedDays.secondDay}`}>
                        
                       </p>
                  </button>
                );
              })}
            </div>
          </div>
          
        ))}
      </div>

      <div className="flex justify-center my-5">
  <div className="flex flex-col items-center">
    <div className={`w-[600px] italic font-bold text-white rounded-lg p-2 bg-red-500 mb-5 ${error ? '' : 'hidden'}`}>
      <p>Su estadía no puede incluir un día no disponible</p>
    </div>
    <div className="w-[300px] italic font-bold text-white rounded-lg p-2 border border-orange-500 bg-orange-500 mb-5">
      <button onClick={handleClick} className="text-xl">Atrás</button>
    </div>
  </div>
  <div className={`w-[300px] ${selectedDays.firstDay && selectedDays.secondDay ? '' : 'hidden'} italic ml-3 font-bold text-white rounded-lg p-2 border border-orange-500 bg-orange-500 mb-20`}>
    <button onClick={setReserve} className="text-xl">Reservar</button>
  </div>
</div>
    </div>
    </>
  );
};

export default Reserve;