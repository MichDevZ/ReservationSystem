import { FC } from "react"
import { Cabains } from "../../interfaces/Cabains";

interface Props {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    Cabain: Cabains;
}

const CabinCard: FC <Props> = ({handleClick, Cabain}) => {
  return (
    <div className="relative w-[400px] overflow-hidden rounded">
    <div className="w-[400px] bg-white 
    rounded-lg group ">
        <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-orange-500 transition-all duration-[500ms] group-hover:w-full"></span>
        <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-orange-500 transition-all duration-[500ms] group-hover:h-full"></span>
        <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-orange-500 transition-all duration-[500ms] group-hover:w-full"></span>
        <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-orange-500 transition-all duration-[500ms] group-hover:h-full"></span>
        <img className="rounded-t-lg h-[300px] w-[400px]" src="cabana.webp" alt="" />
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight
             text-gray-900 dark:text-white">
            {Cabain.cabainName} </h5>
        </a>
        <div className="text-sm grid grid-cols-2 pb-2 gap-1 justify-items-center ">
            <div className="flex items-center ">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="size-6 text-orange-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <p className="ml-1 font-bold text-gray-500">{Cabain.capacity} </p>
            </div>

            <div className="flex items-center mr-8 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-6 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
            </svg>
                <p className="ml-1 font-bold text-gray-500">{Cabain.wifi}</p>
            </div>

            <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-6 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>

            <p className="ml-1 font-bold text-gray-500">{Cabain.hotWater}</p>
            </div>

            <div className="flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-6 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                <p className="ml-1 font-bold text-gray-500">{Cabain.price.toFixed(3)}</p>
            </div>
        </div>
        <button onClick={handleClick} className="inline-flex items-center 
         px-3 py-2 text-sm font-medium text-center text-white
          bg-orange-500 rounded-lg hover:bg-blue-800 focus:ring-4">
            Reservar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-6 ml-1 font-bold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
            </svg>

        </button>
    </div>
</div>

    </div>
  )
}

export default CabinCard
