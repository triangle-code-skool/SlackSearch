import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl">
        Home
      </h1>
      <p>
        Welcome to the Slack Search homepage
      </p>
    </div>
  );
};

export default Home;