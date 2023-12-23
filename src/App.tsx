import Title from "./Title";

export default function App() {
  return (
    <div>
      <Title />
      <div>
        <button
          onClick={() => {
            console.log("the best asd");
          }}
        >
          Test
        </button>
      </div>
    </div>
  );
}
