import React, { useEffect, useState } from "react";


function App() {
  const[input , setInput] = useState("");
  const[habits , setHabits] = useState(()=>{
    const saved = localStorage.getItem("habits");
    return saved?JSON.parse(saved):[]
  });
 const[editId , setEditId] = useState(null);

useEffect(()=>{
 localStorage.setItem("habits" , JSON.stringify(habits))
},[habits])


const handleDelete = (id)=>{
  const deletedHabit = habits.filter(habit=>
    habit.id !== id
  )
  setHabits(deletedHabit)
}
  const handleAdd = ()=>{
    if(!input.trim()) return;
    
    if(editId){
      const UpdatedHabit =habits.map(habit =>
        habit.id === editId?{...habit,text:input}:habit
      )
      setHabits(UpdatedHabit);
      setEditId(null)
    
    }
else{
    const  newHabit = {
            id:Date.now(),
            text:input,
            completed:false
    }


    setHabits([...habits , newHabit]);
  }
    setInput("")

  }

  const handleEdit=(habit)=>{
     setEditId(habit.id);
    setInput(habit.text)
  }

  
  const toggleComplete=(id)=>{
    const updated = habits.map(habit =>
      habit.id === id?{...habit,completed:!habit.completed}:habit
    )
    setHabits(updated);
  }
  const total = habits.length;
  const completedTotal = habits.filter(habit=>habit.completed).length;
  const percantage = total === 0? 0:(completedTotal/total)*100;
  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-slate-950 via-sky-900 to-cyan-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Habit Tracker
          </h1>

          <span className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
            {completedTotal} / {total} Done
          </span>
        </div>

        {/* Input */}
        <div className="mt-8">
          <input
            type="text"
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter"){
                handleAdd();
              }
            }
           
            }
            placeholder={editId?"Update your habit" : "Add new habit"}
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Habit Item */}
        {habits.map(habit=>
        <div key={habit.id} className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-4">
            <input
            checked={habit.completed}
              type="checkbox" onChange={()=>toggleComplete(habit.id)}
              className={`h-5 w-5  ${habit.completed ? "accent-emerald-500" : ""}`}
            />

            <span className={`text-slate-100 font-medium "${habit.completed? "text-slate-100 font-medium line-through opacity-50": "text-slate-100 font-medium"}`}>
              {habit.text}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-cyan-400 cursor-pointer hover:scale-110 transition" onClick={()=>handleEdit(habit)}>
              edit_square
            </span>

            <span className="material-symbols-outlined text-red-400 cursor-pointer hover:scale-110 transition" onClick={()=>handleDelete(habit.id)}>
              delete
            </span>
          </div>
        </div>
)}

        {/* Progress */}
        <div className="mt-8">
          <div className="flex justify-between mb-2 text-slate-300">
            <span>Progress</span>
            <span>{Math.round(percantage)}%</span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-emerald-500 rounded-full" style={{width : `${percantage}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;