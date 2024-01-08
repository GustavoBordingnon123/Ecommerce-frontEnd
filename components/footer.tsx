const Footer = () => {

    const imageUrl = '/resources/images/livroTexturas.png'

    // style={{backgroundImage: `url(${imageUrl})`}}
    
    return (
        <footer className="bg-white border-t shadow-sm">
            <div className="mx-auto py-10 bg-[#19a7ce] bg-contain">
                <p className="text-center text-xs text-white">
                    &copy; 2023 fake BookStore, Inc. all rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;