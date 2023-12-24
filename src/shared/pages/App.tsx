import Title from '@/shared/components/Title';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Title />
      <div>
        <div>{count}</div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment count
        </button>
      </div>
    </div>
  );
}
