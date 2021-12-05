import Reward from "../../entities/Reward";

export const addReward = async user => {
  const response = await fetch(
    "https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/reward.json",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
};

export const fetchRewards = async () => {
  const response = await fetch(
    "https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/reward.json"
  );

  if (!response.ok) {
    throw new Error("Something went wron!");
  }

  const resData = await response.json();
  let rewards = [];
 
  console.log(resData);
  const data = Object.values(resData);
  for (const key in resData) {
    rewards.push(
      new Reward(
        key,
        resData[key].points,
        resData[key].name,
        resData[key].description,
        resData[key].img
      )
    );
  };

  return rewards;
};
