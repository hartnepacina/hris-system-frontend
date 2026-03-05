import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SidebarContextType {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    collapsed: false,
    setCollapsed: () => { },
    toggleCollapsed: () => { },
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(prev => !prev);

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed, toggleCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
