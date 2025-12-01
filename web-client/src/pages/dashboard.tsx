import React, { useEffect, useState } from "react";
import dummyData from "../data/dummy_data.json";


//Card to hold the users info
type User = {
  id: string;
  realName: string;
  displayName?: string;
  email?: string;
  phoneNum?: string;
  likelihood_score?:number;
};

const SAVED_KEY = "saved_profile_ids";

const Dashboard = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedUsers, setSavedUsers] = useState<User[]>([]);


  //Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(SAVED_KEY);
    let ids = [];
    if (raw) {
        ids = JSON.parse(raw);
    }
    setSavedIds(ids);
  }, []);

  //Set up the user
  useEffect(() => {
    const users: User[] = dummyData.map((p) => ({
    id: p.slack_id,
    realName: p.seed_identity.real_name,
    displayName: p.seed_identity.display_name,
    email: p.seed_identity.email,
    phoneNum: p.seed_identity.phone ?? "N/A",
    likelihood_score: p.meta.calculated_likelihood_score
    }));

    const found = savedIds
      .map((id) => users.find((u) => u.id === id))
      .filter((u): u is User => Boolean(u));

    setSavedUsers(found);
    }, [savedIds]);


  return (
    <div>
      <h1 className="text-3xl">
        Dashboard
      </h1>
      {savedUsers.length === 0 ? (
      <p className="mt-4">No saved profiles yet.</p>
    ) : (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedUsers.map((user) => (
          <div key={user.id} className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl text-white font-semibold">{user.realName}</h2>
            <p className="text-sm text-gray-300 mb-2">{user.displayName}</p>

            <div className="text-sm text-white">
              <p>ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNum}</p>
              <p>Websites:</p>
              <div>
                <br /> <p>{user.likelihood_score}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default Dashboard;