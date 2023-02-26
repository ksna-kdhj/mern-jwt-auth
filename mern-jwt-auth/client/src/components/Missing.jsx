import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <section>
            <h1>Missing Page</h1>
            <br />
            <p>We cannot find the page your looking for</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Missing