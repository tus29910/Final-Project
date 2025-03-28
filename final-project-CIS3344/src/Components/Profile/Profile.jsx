import React from 'react';
import styles from './Profile.module.css';
import photo from './profileExample.jpg';

const Profile = () => {
    return (
        <div className={styles.profile}>
            <div className={styles.profileInfo}>
                <h2>Profile</h2>
                <img src={photo} alt="Profile" className={styles.profilePicture} />
                <p className={styles.username}>Welcome, Username!</p>
            </div>

            <div className={styles.reviews}>
                <h2>User Reviews</h2>
                <ul className={styles.reviewList}>
                    <li>Review 1</li>
                    <li>Review 2</li>
                    <li>Review 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;
