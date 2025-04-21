import React from 'react';
import styles from './Profile.module.css';
import Navbar from "../Navbar/Navbar";

const Profile = ({ user, movies }) => {
    if (!user) {
        return (
            <div className={styles.profile}>
                <Navbar />
                <main className={styles.profileContentWrapper}>
                    <div className={styles.profileContent}>
                        <h2>User not found or not logged in.</h2>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.profile}>
            <Navbar />
            <main className={styles.profileContentWrapper}>
                <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <h2>Profile</h2>
                    <img
                        src={user.profile_picture || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className={styles.profilePicture}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="profileUpload"
                        className={styles.fileInput}
                        onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                            document.querySelector(`.${styles.profilePicture}`).src = reader.result;
                            };
                            reader.readAsDataURL(file);
                        }
                        }}
                    />
                    <label htmlFor="profileUpload" className={styles.uploadButton}>Change Profile Picture</label>

                    <p className={styles.username}>Welcome, {user.username}!</p>
                    <p className={styles.bio}>{user.bio}</p>
                    </div>


                    <div className={styles.reviews}>
                        <h2>User Reviews</h2>
                        <ul className={styles.reviewList}>
                            {user.rated_movies.map((rated) => {
                                const movie = movies.find((m) => m.id === rated.movie_id);
                                return (
                                    <li key={rated.movie_id}>
                                        <strong>{movie?.title || 'Unknown Movie'}</strong>: "{rated.review}" - {rated.rating}/5
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
