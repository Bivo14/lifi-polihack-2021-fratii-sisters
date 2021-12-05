import Tips from "../../entities/Tips";

export const addTips = async tip => {
  const response = await fetch(
    "https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/tips.json",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...tip }),
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
};

export const fetchTips = async () => {
  const response = await fetch(
    "https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/tips.json"
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await response.json();
  let tips = [];

  for (const key in resData) {
    tips.push(
      new Tips(
        key,
        resData[key].title,
        resData[key].description,
      )
    );
  };

  return tips;
};
