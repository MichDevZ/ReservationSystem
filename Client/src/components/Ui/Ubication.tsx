import React from 'react'

const Ubication = () => {
  return (
    <>
    <div className='justify-center text-center flex my-10'>
      <div className="w-[300px] italic font-bold text-white rounded-lg 
        p-4 border border-orange-500 hover:bg-orange-500 ">
          <h1 className="text-xl">Cómo llegar</h1>
        </div>
    </div>

        <div className='flex justify-center'>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12023.862367560332!2d-73.06258737216783!3d-41.11344252490477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9617921b83a1ad5f%3A0xf73e24c76c6c0e28!2sFrutillar%2C%20Los%20Lagos!5e0!3m2!1sen!2scl!4v1727202181928!5m2!1sen!2scl" 
            width="100%" height="550"   loading="lazy" ></iframe>
        </div>
        </>
  )
}

export default Ubication
