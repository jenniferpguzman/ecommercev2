import '../stylesheets/Footer.css'

function Footer(){ 
    return(
        <>
        <p>&copy;Jenny Spade 2024</p>
        <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
            </a>
        </div>
    </>
    )
}

export default Footer;

