import { useNavigate } from "react-router-dom"
function home() {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/register&login')
    }
    return (
        <div>
            <button onClick={handleClick}>
                Click me
            </button>
        </div>
    )
}

export default home
