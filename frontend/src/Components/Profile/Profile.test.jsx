import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom';


// Test data
const mockUser = {
  username: "testuser",
  profile_picture: null,
};

const mockReviews = [
  {
    username: "testuser",
    movieId: 123,
    reviewText: "Amazing film!",
    starRating: 5,
  },
];

const mockMovies = [];

beforeEach(() => {
  // Mock localStorage
  localStorage.setItem("currentUser", JSON.stringify(mockUser));
  localStorage.setItem("reviews", JSON.stringify(mockReviews));
  localStorage.setItem("allMovies", JSON.stringify(mockMovies));
});

// Clean up
afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

// Mock Navbar
vi.mock('../Navbar/Navbar', () => {
  return {
    default: () => <div>Mocked Navbar</div>,
  };
});

// Mock fetch for TMDB
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ title: "Fetched Movie Title" }),
  })
);

describe('Profile Component', () => {
  it('renders with fetched movie title', async () => {
    render(<Profile />);
    await waitFor(() => {
      expect(screen.getByText(/Fetched Movie Title/)).toBeInTheDocument();
      expect(screen.getByText(/Amazing film!/)).toBeInTheDocument();
    });
  });

  it('shows message when not logged in', () => {
    localStorage.clear();
    render(<Profile />);
    expect(screen.getByText(/User not found or not logged in/)).toBeInTheDocument();
  });

  it('uploads and displays profile picture', async () => {
    render(<Profile />);

    const file = new File(['dummy'], 'profile.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Change Profile Picture/i);

    // Simulate file input
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      expect(updatedUser.profile_picture).toContain("data:image/png;base64");
    });
  });
});
