import Habit from "../../entities/Habit";

export const fetchHabitsForUsers = async (user) => {

    let habitsForUser = [];

    const habitsResponse = await fetch(
        `https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habits.json`
    );

    if (!habitsResponse.ok) {
        console.log(habitsResponse)
    }
    let habits = [];
    let habitsResponseJson = await habitsResponse.json();
    for (const [key, habit] of Object.entries(habitsResponseJson)) {
        habits.push({ ...habit, key })
    }

    const response = await fetch(
        `https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json`
    );

    if (!response.ok) {
        console.log(response)
    }

    const resData = await response.json();
    Object.entries(resData).filter(hu => hu[1].user === user.key).forEach(hu => {
        let habit = habits.filter(habit => habit.key === hu[1].habit)[0];
        habitsForUser.push(new Habit(habit.key, habit.title, habit.description, hu[1].user, hu[1].rating, hu[1].notifications, hu[0]));
    })

    return habitsForUser;
};

export const fetchActiveHabitsForUsers = async (user) => {

    let habitsForUser = [];

    const habitsResponse = await fetch(
        `https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habits.json`
    );

    if (!habitsResponse.ok) {
        console.log(habitsResponse)
    }
    let habits = [];
    let habitsResponseJson = await habitsResponse.json();
    for (const [key, habit] of Object.entries(habitsResponseJson)) {
        habits.push({ ...habit, key })
    }

    const response = await fetch(
        `https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json`
    );

    if (!response.ok) {
        console.log(response)
    }

    const resData = await response.json();
    Object.entries(resData).filter(hu => hu[1].user === user.key && hu[1].notifications).forEach(hu => {
        let habit = habits.filter(habit => habit.key === hu[1].habit)[0];
        habitsForUser.push(new Habit(habit.key, habit.title, habit.description, hu[1].user, hu[1].rating, hu[1].notifications, hu[0]));
    })

    return habitsForUser;
};


export const updateHabit = (habit) => {

    let h = {
        user: habit.user,
        notifications: habit.notifications,
        rating: habit.rating,
        habit: habit.key
    }
    h = JSON.stringify(h);
    h = `{"${habit.ref}" : ${h}}`;

    fetch(`https://pulihack-default-rtdb.europe-west1.firebasedatabase.app/habit_user.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: h,
        }
    ).then(res => res.json()).then(data => { })
}
