import { useState } from 'react';
import {
    Home, Users, Clock, FileText, DollarSign, Shield, UserCircle,
    Package, Settings, ChevronLeft, ChevronRight, LogOut, Map
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const mainNav = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
    ];

    const hrNav = [
        { icon: Users, label: 'Employee Management', path: '/dashboard/personal-records' },
        { icon: Clock, label: 'Time & Attendance', path: '/dashboard/attendance' },
        { icon: FileText, label: 'Leave Management', path: '/dashboard/leave' },
        { icon: DollarSign, label: 'Payroll', path: '/dashboard/payroll' },
        { icon: Shield, label: 'Goverment Compliance', path: '/dashboard/compliance' },
    ];

    const moduleNav = [
        { icon: UserCircle, label: 'Self-Service', path: '/dashboard/self-service' },
        { icon: Package, label: 'Asset Management', path: '/dashboard/assets' },
        { icon: Map, label: 'Regional Offices', path: '/dashboard/regions' },
    ];

    const systemNav = [
        { icon: Settings, label: 'Admin Settings', path: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        // remove stored login data if meron
        localStorage.removeItem("token");

        // redirect to login page
        navigate("/login");
    };

    const NavSection = ({ title, items }: { title: string; items: typeof mainNav }) => (
        <div className="mb-2">
            {!collapsed && (
                <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/50">
                    {title}
                </p>
            )}

            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                        `group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                            isActive
                                ? 'bg-white/15 text-white'
                                : 'text-emerald-100/70 hover:bg-white/8 hover:text-white'
                        } ${collapsed ? 'justify-center px-0' : ''}`
                    }
                >
                    <item.icon className="w-[18px] h-[18px]" />

                    {!collapsed && <span>{item.label}</span>}
                </NavLink>
            ))}
        </div>
    );

    return (
        <div
            className={`h-screen flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 ${
                collapsed ? 'w-[72px]' : 'w-[260px]'
            }`}
            style={{
                background:
                    'linear-gradient(180deg, #064e3b 0%, #065f46 40%, #047857 100%)'
            }}
        >

            {/* Logo */}
            <div className="px-4 pt-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5">
                        <img src={logo} alt="logo" />
                    </div>

                    {!collapsed && (
                        <div>
                            <p className="text-white font-bold">
                                SimpleVia
                            </p>

                            <p className="text-emerald-300 text-xs">
                                HRIS Platform
                            </p>
                        </div>
                    )}

                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">

                <NavSection title="Main" items={mainNav} />
                <NavSection title="Human Resources" items={hrNav} />
                <NavSection title="Modules" items={moduleNav} />
                <NavSection title="System" items={systemNav} />

            </nav>

            {/* Bottom Section */}
            <div className="border-t border-white/10 p-3 space-y-2">

                {/* Collapse */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-emerald-200 hover:bg-white/10"
                >
                    {collapsed ? (
                        <ChevronRight size={16} />
                    ) : (
                        <>
                            <ChevronLeft size={16} />
                            Collapse
                        </>
                    )}
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-500/20 transition"
                >

                    <LogOut size={16} />

                    {!collapsed && "Logout"}

                </button>

            </div>

        </div>
    );
};

export default Sidebar;