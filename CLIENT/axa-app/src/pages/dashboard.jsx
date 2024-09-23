import { useNavigate } from "react-router-dom";
function dashboard({ userData }) {

    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {userData.first_name}</p>
            <a href="" onClick={handleClick}>back home</a>
        </div>
    )
}

export default dashboard ;
