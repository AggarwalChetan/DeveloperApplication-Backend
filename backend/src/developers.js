const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');

// Users object to store the data
const usersInformation = {};

// POST Method 
const postUsersInfo = (req, res) => {
    let user = req.body;
    const userName = user.github_id;
    const userNameLinkedIn = user.linkedin_id;
    const userNameCodeChef = user.codedhef_id;
    const userNameHackerRank = user.hackerrank_id;
    const userNameTwitter = user.twitter_id;
    const userNameMedium = user.medium_id;

    if (userName == null || userName == "") {
        res.status(404).send("Invalid Github");
    }

    if (userName != null && userName != "") {
        axios(`https://api.github.com/users/${userName}`)
            .then(response => {
                user = {
                    "id": response.data.login,
                    "avatar_url": response.data.avatar_url,
                    "name": response.data.name,
                    "company": response.data.company,
                    "blog": response.data.blog,
                    "location": response.data.location,
                    "email": response.data.email,
                    "bio": response.data.bio,
                    "github_id": response.data.login,
                    "linkedin_id": userNameLinkedIn,
                    "codeChef_id": userNameCodeChef,
                    "hackerrank_info": userNameHackerRank,
                    "twitter_id": userNameTwitter,
                    "medium_id": userNameMedium
                }

                usersInformation[response.data.login] = user;
        });

        axios(`https://api.github.com/users/${userName}/repos`)
            .then(response => {
                const arr = response.data;
                const repos = [];

                if(arr == null || arr.length == '0'){
                    res.status(200).send({"id" : usersInformation[userName]});
                }else{
                    for (let i = 0; i < arr.length; ++i) {
                        repos[i] = {
                            "name": arr[i].name,
                            "html_url": arr[i].owner.html_url,
                            "description": arr[i].description,
                            "updated_at": arr[i].updated_at
                        }
                    }
                    usersInformation[userName]['repos'] = repos;
                    res.status(200).send({"id" : usersInformation[response.data[0].owner.login].id});
                } 
        });
    }
};

// GET method to get info of particular user by Id
const getDeveloperById = (req, res) => {
        const developers = [];
        const keys = Object.keys(usersInformation);
    
        for (let i = 0; i < keys.length; ++i) {
            const user = {
                'id': usersInformation[keys[i]].id,
                'avatar_url': usersInformation[keys[i]].avatar_url
            };
    
            developers[i] = user;
        }
    
        res.send(developers);
}

// function to get info of all users
const getDevelopers = (req, res) => {
    res.send(usersInformation[req.params.developer]);
};

// POST Method
router.post('/', postUsersInfo);

// GET method to get the info of all users
router.get('/developers', getDeveloperById);

// GET method to get info of particular user by Id
router.get('/developers/:developer', getDevelopers);

// export the router
module.exports = router;