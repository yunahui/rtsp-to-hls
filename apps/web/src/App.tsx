import ApiTest from '@/components/ApiTest';
const App = () => {
  return (
    <div>
      <ApiTest name="Get default" url="/api" />
      <ApiTest name="Get hello" url="/api/hello" />
    </div>
  );
};

export default App;
