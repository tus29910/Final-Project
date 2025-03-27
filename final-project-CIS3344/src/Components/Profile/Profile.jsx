import React from 'react';
import StyleSheet from './Profile.module.css';
import photo from './profileExample.jpg';

// Function to retrieve most recent movie reviews
// Function to retrieve profile picture & username

const Profile = () => {
    return (
        <div id="profile" className={StyleSheet.profile}>

            <div className={StyleSheet.profileInfo}>
                <h2>Profile</h2>
                <img id="profilePicture" src={photo} alt="Profile Picture" />
                <p id="username">Welcome: Username!</p>
            </div>

            <div className={StyleSheet.reviews}>
            <h2>Users Review List:</h2>
                <ul class="reviewList">
                    <li id="R1">Review 1</li>
                    <li id="R2">Review 2</li>
                    <li id="R3">Review 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;