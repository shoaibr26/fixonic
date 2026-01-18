import { useState, useCallback } from "react";
import {
  INITIAL_BLOGS,
  INITIAL_REVIEWS,
  DUMMY_REPAIRS,
} from "../data/mockData";
import { DataContext } from "./DataContext";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

export const DataProvider = ({ children }) => {
  // Blog CRUD
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoadingBlogs(true);
    try {
      const response = await fetch(`${API_URL}/blogs`);
      const data = await response.json();
      if (response.ok) {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  }, []);

  const addBlog = async (blogData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (response.ok) {
        setBlogs([data, ...blogs]);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      return { success: false, message: error.message };
    }
  };

  const updateBlogData = async (updatedBlog) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/blogs/${updatedBlog._id || updatedBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBlog),
      });

      const data = await response.json();
      if (response.ok) {
        setBlogs(blogs.map((b) => ((b._id || b.id) === (data._id || data.id) ? data : b)));
        return { success: true };
      } else {
         return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      return { success: false, message: error.message };
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setBlogs(blogs.filter((b) => (b._id || b.id) !== id));
        return { success: true };
      } else {
         const data = await response.json();
         return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return { success: false, message: error.message };
    }
  };

  // Review Moderation
  // Review Moderation
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`${API_URL}/reviews`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  const addReview = async (reviewData) => {
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reviewData),
        });
        const data = await response.json();
        if (response.ok) {
            setReviews([...reviews, data]);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
      } catch (error) {
          console.error("Error adding review:", error);
          return { success: false, message: error.message };
      }
  };

  const updateReview = async (updatedReview) => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/reviews/${updatedReview._id || updatedReview.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedReview),
        });
        const data = await response.json();
        if (response.ok) {
            setReviews(reviews.map((r) => ((r._id || r.id) === (data._id || data.id) ? data : r)));
            return { success: true };
        } else {
             return { success: false, message: data.message };
        }
    } catch (error) {
        console.error("Error updating review:", error);
        return { success: false, message: error.message };
    }
  };

  const deleteReview = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReviews(reviews.filter((r) => (r._id || r.id) !== id));
        return { success: true };
      } else {
          const data = await response.json();
          return { success: false, message: data.message };
      }
    } catch (error) {
       console.error("Error deleting review:", error);
       return { success: false, message: error.message };
    }
  };

  // User Management
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/users/${updatedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map((u) => (u._id === data._id ? data : u)));
        return { success: true };
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false, message: error.message };
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter((u) => u._id !== id));
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return { success: false, message: error.message };
    }
  };

  // Contact Management
  const [contacts, setContacts] = useState([]);

  const fetchContacts = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_URL}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, []);

  const submitContact = async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      return { success: false, message: error.message };
    }
  };

  const deleteContactMessage = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter((c) => c._id !== id));
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      return { success: false, message: error.message };
    }
  };

  // Repair Management
  // Content Management
  const fetchContent = useCallback(async (pageName) => {
    try {
      const response = await fetch(`${API_URL}/content/${pageName}`);
      const data = await response.json();
      if (response.ok) {
        return data.sections || {};
      }
      return {};
    } catch (error) {
      console.error("Error fetching content:", error);
      return {};
    }
  }, []);

  const updateContent = async (pageName, sections) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/content/${pageName}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sections }),
      });
      const data = await response.json();
      if (response.ok) {
         return { success: true, data };
      } else {
         return { success: false, message: data.message };
      }
    } catch (error) {
       console.error("Error updating content:", error);
       return { success: false, message: error.message };
    }
  };

  const [repairs, setRepairs] = useState(DUMMY_REPAIRS);
  
  const addRepair = (repair) => {
    setRepairs([repair, ...repairs]);
  };

  const updateRepairStatus = (id, newStatus) => {
    setRepairs(
      repairs.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  const deleteRepair = (id) => {
    setRepairs(repairs.filter((r) => r.id !== id));
    return { success: true };
  };

  return (
    <DataContext.Provider
      value={{
        blogs,
        loadingBlogs,
        fetchBlogs,
        addBlog,
        updateBlog: updateBlogData,
        deleteBlog,
        reviews,
        loadingReviews,
        fetchReviews,
        addReview,
        updateReview,
        deleteReview,
        users,
        updateUser,
        deleteUser,
        fetchUsers,
        repairs,
        addRepair,
        updateRepairStatus,
        deleteRepair,
        contacts,
        fetchContacts,
        submitContact,
        deleteContactMessage,
        fetchContent,
        updateContent2: updateContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
