import './Logo.css';


const Logo = () => {
    return (
        <div className="logo">
            <img src={require("../img/logo.png").default}></img>
        </div>
    )
}
export default Logo