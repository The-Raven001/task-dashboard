import { Link } from "react-router-dom";

export function Landing () {

    return (
        <div>
            <h1>
                Welcome to task manager
            </h1>
            <p>Keep track of all your tasks in one place</p>

            <p><Link to="/Register">Click here to create your account</Link></p>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
