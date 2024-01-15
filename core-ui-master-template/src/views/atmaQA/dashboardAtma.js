import React from "react";

const Dashboard = ({ user, setAuth }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };
    // console.log(user);

    return (
        <div>
            <h1>Welcome {user.userloggedin.name}</h1>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
