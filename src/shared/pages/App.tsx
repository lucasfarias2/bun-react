import Title from '@/shared/components/Title';

export default function App() {
  return (
    <div>
      <Title />
      <div>
        <button
          onClick={() => {
            alert('the best asd');
          }}
        >
          Test a
        </button>
      </div>
    </div>
  );
}
