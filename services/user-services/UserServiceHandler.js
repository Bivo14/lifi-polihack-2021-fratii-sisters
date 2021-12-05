import Users from '../../entities/Users';

export const addUsers = async user => {
  user.score = 0;
  const response = await fetch(
    'https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...user }),
    }
  );

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  addedUser = (await fetchUsers()).filter(usr => usr.username === user.username)[0];
  const hu1 = {
    habit: "aaazaza",
    user: addedUser.key,
    rating: 0,
    notifications: false
  }
  const hu2 = {
    habit: "asdagffasdgasg",
    user: addedUser.key,
    rating: 0,
    notifications: false
  }
  const hu3 = {
    habit: "d mfmgbj,lkfhnjkagbj",
    user: addedUser.key,
    rating: 0,
    notifications: false
  }

  const response1 = await fetch(
    'https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...hu1 }),
    }
  );

  if (!response1.ok) {
    throw new Error('Something went wrong!');
  }

  const response2 = await fetch(
    'https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...hu2 }),
    }
  );

  if (!response2.ok) {
    throw new Error('Something went wrong!');
  }

  const response3 = await fetch(
    'https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...hu3 }),
    }
  );

  if (!response3.ok) {
    throw new Error('Something went wrong!');
  }

  user.key = addedUser.key;
  return user;
};

export const fetchUsers = async () => {
  const response = await fetch(
    'https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/users.json'
  );

  if (!response.ok) {
    throw new Error('Something went wron!');
  }

  const resData = await response.json();
  let users = [];

  // console.log(resData);

  for (const key in resData) {
    users.push(
      new Users(
        key,
        resData[key].username,
        resData[key].firstName,
        resData[key].lastName,
        resData[key].password,
        resData[key].email,
        resData[key].score
      )
    );
  }

  return users;
};

export const updateUser = user => {
  u = JSON.stringify({
    score: user.score,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
  });
  u = `{"${user.key}" : ${u}}`;

  fetch(
    `https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: u,
    }
  )
    .then(res => res.json())
    .then(data => { })
    .catch(err => console.log(err));
};
