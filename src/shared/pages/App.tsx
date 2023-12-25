import { useState } from 'react';
import Title from '@/shared/components/Title';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 text-center">
      <div className="mb-16 rounded-2xl py-16">
        <img
          src="https://bun.sh/logo.svg"
          alt="Bun logo"
          className="w-24 mx-auto mb-4 transition duration-200 ease-in-out hover:scale-125 hover:rotate-12"
        />
        <Title />
        <div className="flex items-center justify-center mb-12">
          <button
            className="bg-rose-500 px-4 py-2 rounded-3xl text-white text-sm font-medium shadow hover:opacity-90"
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          <div className="bg-white py-2 px-4 border rounded-full inline-block font-medium shadow-sm mx-2">{count}</div>
          <button
            className="bg-green-500 px-4 py-2 rounded-3xl text-white text-sm font-medium shadow hover:opacity-90"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
        <button className="bg-black px-6 py-3 rounded-3xl text-white text-sm font-medium shadow flex items-center mx-auto hover:bg-black/80 border border-white">
          <img src="https://i.imgur.com/RpZl3K5.png" alt="Packlify logo" className="w-5 inline-block mr-2" />
          Deploy with Packlify
        </button>
      </div>
    </div>
  );
}
