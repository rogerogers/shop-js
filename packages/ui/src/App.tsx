import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Button } from './components/ui/button';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex-col space-y-4">
        <div className="flex justify-center">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <div className="flex justify-center">
          <h1 className="w-72 text-center">Vite + React</h1>
        </div>
        <div className="flex flex-col jusustify-center items-center gap-4 m-8">
          <Button
            onClick={() => setCount((count) => count + 1)}
            className="w-24"
          >
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
