interface Person {
  name: string;
  age: number;
  salary: number;
}

const App = () => {
  const person: Person = {
    name: "john",
    age: 20,
    salary: 13000,
  };
  return (
    <>
      <h1>{person.age}</h1>
    </>
  );
};

export default App;
