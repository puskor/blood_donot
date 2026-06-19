import Footer from "@/components/sheard/Footer";
import Navbar from "@/components/sheard/Navbar";



const MainAuthLayout = ({ children }) => {

    return (
        <div>
            <Navbar/>
            <div className="pt-10">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default MainAuthLayout;