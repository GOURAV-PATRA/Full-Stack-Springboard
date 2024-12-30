import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import BannerImage from "../assets/banner.png";
import courseImg from "../assets/course.jpg";

const Dashboard = () => {
    const [userRole, setUserRole] = useState("participant");
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering courses
    const [filter, setFilter] = useState("all"); // Filter for courses (All, Enrolled, Completed)
    const navigate = useNavigate();

    // Memoize the channel object to avoid re-creation on each render
    const channel = useMemo(() => new BroadcastChannel("auth"), []);

    // Simulated courses data
    const allCourses = [
        { 
            id: 1, 
            course_title: "React for Beginners", 
            instructor_name: "John Doe", 
            description: "Learn React from scratch.", 
            start_date: "2024-01-01", 
            end_date: "2024-06-01", 
            isEnrolled: false, 
            isCompleted: false,
            image_url:'C:\Users\Iqra2\OneDrive\Desktop\new\Full-Stack-Springboard-master\frontend\src\assets\course.jpg'
        },
        { 
            id: 2, 
            course_title: "Advanced JavaScript", 
            instructor_name: "Jane Smith", 
            description: "Master advanced JavaScript concepts.", 
            start_date: "2024-02-01", 
            end_date: "2024-07-01", 
            isEnrolled: true, 
            isCompleted: false,
            image_url:'C:\Users\Iqra2\OneDrive\Desktop\new\Full-Stack-Springboard-master\frontend\images\course.jpg'
        },
        { 
            id: 3, 
            course_title: "Python Data Science", 
            instructor_name: "Emily Davis", 
            description: "Dive deep into Python for data science.", 
            start_date: "2024-03-01", 
            end_date: "2024-08-01", 
            isEnrolled: false, 
            isCompleted: true,
            image_url:'C:\Users\Iqra2\OneDrive\Desktop\new\Full-Stack-Springboard-master\frontend\images\course.jpg'
        },
        { 
            id: 4, 
            course_title: "English", 
            instructor_name: "Mr Brown", 
            description: "Master advanced English.", 
            start_date: "2025-02-01", 
            end_date: "2025-07-01", 
            isEnrolled: false, 
            isCompleted: false,
            image_url:'C:\Users\Iqra2\OneDrive\Desktop\new\Full-Stack-Springboard-master\frontend\images\course.jpg'
        },
        { 
            id: 5, 
            course_title: "Maths", 
            instructor_name: "Abd", 
            description: "Master  Maths concepts.", 
            start_date: "2024-07-01", 
            end_date: "2024-09-01", 
            isEnrolled: false, 
            isCompleted: false,
            image_url:'C:\Users\Iqra2\OneDrive\Desktop\new\Full-Stack-Springboard-master\frontend\images\course.jpg'
        },
    ];

    useEffect(() => {
        // Fetch user role from local storage or simulate a user role (for frontend testing)
        const storedRole = localStorage.getItem("role") || "participant";
        setUserRole(storedRole);

        // Simulate fetching courses (just using static data for now)
        setCourses(allCourses);

        // Channel to handle logout
        channel.onmessage = (event) => {
            if (event.data === "logout") {
                logoutUser();
            }
        };

        // Clean up channel listener when component unmounts
        return () => {
            channel.close();
        };
    }, [channel]);

    const logoutUser = () => {
        localStorage.clear();
        channel.postMessage("logout");
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.clear();
        channel.postMessage("logout");
        navigate("/");
    };

    const handleEnroll = (courseId) => {
        // Update course enrollment status locally (no backend required)
        setCourses(courses.map((course) => {
            if (course.id === courseId) {
                return { ...course, isEnrolled: true };
            }
            return course;
        }));
    };

    const filteredCourses = courses
        .filter((course) =>
            course.course_title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((course) => {
            if (filter === "all") return true;
            if (filter === "enrolled") return course.isEnrolled;
            if (filter === "completed") return course.isCompleted;
            return false;
        });

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <div className="header">
                <h1 style={{ display: "flex", alignItems: "center" }}>
                    Upskill Vision
                    {userRole && (
                        <span className="dashboard-tag">
                            {userRole} Dashboard
                        </span>
                    )}
                </h1>
                <div className="user-info">
                    <span>Welcome, {userRole}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            {/* Banner Section */}
            <div className="banner">
                <img src={BannerImage} alt="Banner" />
            </div>

            {/* Content Section */}
            <div className="content">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search courses..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Filter Section */}
                <div className="filter-section">
                    <button onClick={() => setFilter("all")}>All Courses</button>
                    <button onClick={() => setFilter("enrolled")}>Enrolled Courses</button>
                    <button onClick={() => setFilter("completed")}>Completed Courses</button>
                </div>

                {/* Courses Section */}
                <div className="courses-section">
                    <h3>Available Courses</h3>
                    <div className="course-grid">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <div className="course-tile" key={course.id}>
                                    <div className="course-image">
                                        <img src={courseImg} alt={course.course_title} />
                                    </div>
                                    <div className="course-info">
                                        <h4>{course.course_title}</h4>
                                        <p>
                                            <strong>Instructor:</strong>{" "}
                                            {course.instructor_name}
                                        </p>
                                        <p>{course.description}</p>
                                        <p>
                                            <strong>Start Date:</strong>{" "}
                                            {course.start_date}
                                        </p>
                                        <p>
                                            <strong>End Date:</strong>{" "}
                                            {course.end_date}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {course.isEnrolled
                                                ? "Enrolled"
                                                : course.isCompleted
                                                ? "Completed"
                                                : "Not Enrolled"}
                                        </p>
                                    </div>
                                    {/* Enroll button */}
                                    {!course.isEnrolled && !course.isCompleted && (
                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            className="enroll-btn"
                                        >
                                            Enroll
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No courses found matching your search or filter.</p>
                        )}
                    </div>
                </div>

                {/* Announcements Section */}
                <div className="announcements-section">
                    <h3>Announcements</h3>
                    <p>No new announcements.</p>
                </div>
            </div>

            {/* Footer Section */}
            <p className="inspirational-quote">
                "The best way to predict the future is to create it." — Peter
                Drucker
            </p>
        </div>
    );
};

export default Dashboard;
