import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage></ErrorMessage>
            <p
                style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>
                    Error 404, the page doesn't exist
            </p>
            <Link
                to="/"
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>
                    Back to Home page
            </Link>
        </div>
    );
}

export default Page404;