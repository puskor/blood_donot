import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

const MainDashboard = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <TopNavbar />

            <div className="flex pt-20">
                <Sidebar />
                <main className="flex-1 p-4 md:px-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainDashboard;