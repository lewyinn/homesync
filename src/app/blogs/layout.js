import Footer from '@/components/layouts/FooterComponents'
import Navbar from '@/components/layouts/NavbarComponents'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div className="overflow-x-hidden">
            <div className="container mx-auto px-2 md:px-0">
                <Navbar />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout