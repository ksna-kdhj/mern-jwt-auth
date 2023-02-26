import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>Lounge Page</h1>
            <br />
            <p>You must have been assigned an Admin or Editor role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge