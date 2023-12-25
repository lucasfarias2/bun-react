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
          className="mx-auto mb-4 w-24 transition duration-200 ease-in-out hover:rotate-12 hover:scale-125"
        />
        <Title />
        <div className="mb-12 flex items-center justify-center">
          <button
            className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          <div className="mx-2 inline-block rounded-full border bg-white px-4 py-2 font-medium shadow-sm">{count}</div>
          <button
            className="rounded-3xl bg-green-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
        <button className="mx-auto flex items-center rounded-3xl border border-white bg-black px-6 py-3 text-sm font-medium text-white shadow hover:bg-black/80">
          <img src="https://i.imgur.com/RpZl3K5.png" alt="Packlify logo" className="mr-2 inline-block w-5" />
          Deploy with Packlify
        </button>
      </div>
    </div>
  );
}
