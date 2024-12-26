import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const AddEntry = () => {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [calories, setCalories] = useState(0);
  const navigate = useNavigate();

  const handleAdd = async () => {
    const entry = {
      userId: auth.currentUser.uid,
      date: new Date().toISOString().split("T")[0],
      entries: [{ food, quantity, calories }],
      totalCalories: quantity * calories,
    };

    await addDoc(collection(db, "calorie_logs"), entry);
    navigate("/home");
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className="flex items-center h-screen">
      <div className="p-6 border bg-slate-500 w-1/2 mx-auto rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Add Calorie Entry</h1>
        <input
          type="text"
          placeholder="Food"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setFood(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Calories"
          className="w-full p-2 border rounded mb-3"
          onChange={(e) => setCalories(Number(e.target.value))}
        />

        <div className="flex justify-between">
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded">
            Add Entry
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-green-500 text-white px-4 py-2 rounded">
            Previous Record
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntry;
