import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl">
        Dashboard
      </h1>
      <p>Welcome to the Slack Search dashboard</p>
    </div>
  );
};

export default Dashboard;