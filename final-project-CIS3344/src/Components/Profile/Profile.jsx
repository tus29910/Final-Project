import React from 'react';

const Profile = () => {
    return (
        <div>
            <header id="profileHeader">
                <h1>Profile</h1>
            </header>

            <section id="profileInfo">
                <img id="profilePicture" src="https://via.placeholder.com/150" alt="Profile Picture" />
                <p id="username">Welcome: </p>
            </section>

            <section id="userReviews">
                <h2>
                    Users Review List:
                </h2>
                <ul class="reviewList">
                    <li id="R1">Review 1</li>
                    <li id="R2">Review 2</li>
                    <li id="R3">Review 3</li>
                </ul>
            </section>
        </div>
    );
};

export default Profile;