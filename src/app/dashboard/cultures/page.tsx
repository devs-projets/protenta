import { Plus } from 'lucide-react'
import React from 'react'

const cultures = [
  { id: 1, name: 'Culture A', start: '01-01-2024', end: '01-06-2024', status: 'Cloturé' },
  { id: 2, name: 'Culture B', start: '05-01-2023', end: '05-06-2023', status: 'Cloturé' },
  { id: 3, name: 'Culture C', start: '02-02-2024', end: '02-07-2024', status: 'Cloturé' },
  { id: 4, name: 'Culture D', start: '03-01-2023', end: '03-06-2023', status: 'Cloturé' },
  { id: 5, name: 'Culture E', start: '04-01-2024', end: '04-06-2024', status: 'Cloturé' },
  { id: 6, name: 'Culture F', start: '06-01-2023', end: '06-06-2023', status: 'Encours' },
]

const Page = () => {
  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center px-5 mt-5'>
        <h1 className='text-3xl font-bold'>Liste des cultures</h1>
        <div className='flex items-center gap-3'>
          <span>Ajouter une culture</span>
          <button className='bg-primary text-white px-3 py-2 rounded-lg'>
            <Plus />
          </button>
        </div>
      </div>

      <div className='my-2'>
        <hr />
      </div>

      {/* Cards Container */}
      <div className='flex flex-wrap gap-5 p-5'>
        {cultures.map((culture) => (
          <div
            key={culture.id}
            className='w-[280px] bg-secondary relative p-5 rounded-lg shadow-lg border cursor-pointer hover:shadow-xl'
          >
            {/* Badge */}
            <span
              className={`absolute top-0 right-0 rounded-lg px-3 py-1 ${
                culture.status === 'Encours' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
            >
              {culture.status}
            </span>

            {/* Card Content */}
            <h2 className='text-2xl font-bold mt-4'>{culture.name}</h2>
            <p>Début : {culture.start}</p>
            <p>{culture.status === "Cloturé" && `Fin : ${culture.end}`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
