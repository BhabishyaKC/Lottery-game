'use client'
import { Apple, Cherry, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const LotteryGame = () => {
  const [lifeCount, setLifeCount] = useState(5);
  const [randomId, setRandomId] = useState([2, 2, 2]);
  const [gameMsg, setGameMsg] = useState("🎰 Welcome to the Lottery Game! Match all three to win!");

  const items = [
    { icon: <Cherry size={40} />, name: "Cherry" },
    { icon: <Apple size={40} />, name: "Apple" },
    { icon: <span className="text-4xl font-bold">7</span>, name: "Seven" },
  ];

  useEffect(() => {
    if (lifeCount === 0) {
      setGameMsg("💀 Game Over! Click restart to play again.");
    }
  }, [lifeCount]);

  const generateRandomIds = () => {
    if (lifeCount === 0) return; 

    const first = Math.floor(Math.random() * 3);
    const second = Math.floor(Math.random() * 3);
    const third = Math.floor(Math.random() * 3);

    setRandomId([first, second, third]);

    if (first === second && second === third) {
      if (first === 2) {
        setGameMsg("🎉 JACKPOT! All Sevens!");
      } else {
        setGameMsg("🎊 You won a prize!");
      }
    } else {
      const nextLife = lifeCount - 1;
      setLifeCount(nextLife);
      setGameMsg(nextLife > 0 ? `❌ Try again! Lives left: ${nextLife}` : "💀 Game Over! Click restart to play again.");
    }
  };

  const restartGame = () => {
    setLifeCount(5);
    setRandomId([2, 2, 2]);
    setGameMsg("🎰 Welcome to the Lottery Game! Match all three to win!");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white font-sans space-y-6 px-4">


      <div className="text-2xl font-bold text-center drop-shadow-lg">
        {gameMsg}
      </div>

      

      <div className="flex gap-1">
        {[...Array(lifeCount)].map((_, idx) => (
          <Heart key={idx} color="red" className="fill-red-600" />
        ))}
      </div>

     

      <div className="relative flex items-center justify-center mt-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-xl p-6 flex gap-6 w-[360px] h-[180px] justify-center items-center border-4 border-white/30">
          {randomId.map((id, index) => (
            <div
              key={index}
              className="bg-white text-black w-24 h-24 flex items-center justify-center rounded-xl shadow-inner text-2xl font-bold"
            >
              {items[id].icon}
            </div>
          ))}
        </div>

      

        <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
          <button
            onClick={generateRandomIds}
            disabled={lifeCount === 0}
            className={`transition-transform ${lifeCount > 0 ? "hover:scale-110" : "opacity-40 cursor-not-allowed"}`}
          >
            <img
              src="/lever.png"
              width={60}
              height={100}
              alt="Lever"
              className="rotate-90 cursor-pointer"
            />
          </button>
        </div>
      </div>

     
      <button
        onClick={restartGame}
        className="mt-6 bg-white text-purple-700 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-purple-100 transition-all cursor-pointer"
      >
        🔁 Restart
      </button>
    </div>
  );
};

export default LotteryGame;
