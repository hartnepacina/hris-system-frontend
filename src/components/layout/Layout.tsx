import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useSidebar } from '../../context/SidebarContext';

const Layout = () => {
    const { collapsed } = useSidebar();

    return (
        <div className="flex h-screen bg-[#f1f5f9]">
            <Sidebar />
            <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
                <TopBar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <div className="container mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;