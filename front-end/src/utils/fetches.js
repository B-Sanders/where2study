export async function getLocations() {
    const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  
    };
    return fetch('http://localhost:1337/locations/all-locations', config)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export async function getUser(userId) {
    const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  
    };
    return fetch(`http://localhost:1337/user/profile?userid=${userId}`, config)
        .then((res) =>  res.json())
        .catch(err => console.log(err));
}

export async function getRequests() {
    const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  
    };
    return fetch('http://localhost:1337/requests/all-requests', config)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export async function editProfile({ userClasses, displayName, userMajor, userPronouns, userID }) {
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userClasses,
            displayName,
            userMajor,
            userPronouns, 
            userID
        }),
    }
    return fetch('http://localhost:1337/user/edit-profile', config)
        .then((res) => res.status)
        .catch((err) => console.log(err));
}