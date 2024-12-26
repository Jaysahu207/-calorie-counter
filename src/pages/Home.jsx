import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      const q = query(
        collection(db, "calorie_logs"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setEntries(data);
    };

    fetchEntries();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center h-screen">
        <div className="p-6 border bg-slate-500 w-1/2 mx-auto rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Calorie Logs</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="bg-white p-4 shadow rounded">
                <h2 className="font-bold">{entry.date}</h2>
                <ul>
                  {entry.entries.map((item, i) => (
                    <li key={i}>
                      {item.food} - {item.quantity} x {item.calories} kcal
                    </li>
                  ))}
                </ul>
                <p className="font-bold">Total: {entry.totalCalories} kcal</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/add-entry")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Add Entry
          </button>
          
        </div>
    
      </div>
    </>
  );
};

export default Home;
