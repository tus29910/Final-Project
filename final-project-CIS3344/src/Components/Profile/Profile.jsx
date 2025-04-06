import React from 'react';
import styles from './Profile.module.css';
import Navbar from '../Navbar/navBar';

const Profile = ({ user, movies }) => {

    console.log(user);
    console.log(movies);
    return (
        <div className={styles.profile}>
            <Navbar />
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <h2>Profile</h2>
                    <img
                        src={user.profile_picture || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className={styles.profilePicture}
                    />
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
        </div>
    );
};

export default Profile;
