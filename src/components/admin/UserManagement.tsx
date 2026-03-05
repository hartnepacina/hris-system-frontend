import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UserPlus, Edit, Trash2, X, MoreVertical, EyeOff, Ban } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Juan Dela Cruz', email: 'juan.delacruz@simplevia.com', role: 'Administrator', status: 'Active', lastActive: '2 mins ago' },
        { id: 2, name: 'Maria Santos', email: 'maria.santos@simplevia.com', role: 'HR Manager', status: 'Active', lastActive: '1 hour ago' },
        { id: 3, name: 'Jose Reyes', email: 'jose.reyes@simplevia.com', role: 'Regional Director', status: 'Inactive', lastActive: '2 days ago' },
        { id: 4, name: 'Ana Garcia', email: 'ana.garcia@simplevia.com', role: 'Staff', status: 'Active', lastActive: '5 mins ago' },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Staff', status: 'Active' });

    // Dropdown menu state
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const statusBadge: Record<string, string> = {
        Active: 'badge-success',
        Inactive: 'badge-neutral',
    };

    const handleOpenAdd = () => {
        setFormData({ name: '', email: '', role: 'Staff', status: 'Active' });
        setShowAddModal(true);
    };

    const handleAddUser = () => {
        if (!formData.name || !formData.email) {
            alert('Please fill out Name and Email.');
            return;
        }
        const newUser: User = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            lastActive: 'Just now',
        };
        setUsers([...users, newUser]);
        setShowAddModal(false);
    };

    const handleOpenEdit = (user: User) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
        setShowEditModal(true);
        setActiveMenu(null);
    };

    const handleSaveEdit = () => {
        if (!editingUser) return;
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role, status: formData.status } : u));
        setShowEditModal(false);
        setEditingUser(null);
    };

    const handleDeleteUser = (id: number) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
        setActiveMenu(null);
    };

    const handleToggleStatus = (user: User) => {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
        setActiveMenu(null);
    };

    // Shared form fields used in both Add and Edit modals
    const renderFormFields = () => (
        <div className="space-y-4">
            <div>
                <label className="pro-label">Full Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="pro-input"
                    placeholder="e.g. Juan Dela Cruz"
                />
            </div>
            <div>
                <label className="pro-label">Email Address</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="pro-input"
                    placeholder="e.g. juan@simplevia.com"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="pro-label">Role</label>
                    <select
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        className="pro-select"
                    >
                        <option>Administrator</option>
                        <option>HR Manager</option>
                        <option>Regional Director</option>
                        <option>Staff</option>
                    </select>
                </div>
                <div>
                    <label className="pro-label">Status</label>
                    <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                        className="pro-select"
                    >
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-800">User Management</h3>
                <button onClick={handleOpenAdd} className="btn btn-primary">
                    <UserPlus className="w-4 h-4" /> Add User
                </button>
            </div>

            {/* Users Table — standardized pro-table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="pro-table">
                    <thead>
                        <tr>
                            {['Name', 'Role', 'Status', 'Last Active', 'Actions'].map(h => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                            <p className="text-[11px] text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    <span className={`badge ${statusBadge[user.status]}`}>
                                        <span className="badge-dot" />{user.status}
                                    </span>
                                </td>
                                <td>{user.lastActive}</td>
                                <td>
                                    <div className="relative flex gap-1 justify-center">
                                        <button onClick={() => handleOpenEdit(user)} className="btn-ghost btn-icon text-blue-500 hover:bg-blue-50" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)} className="btn-ghost btn-icon text-gray-400 hover:bg-gray-100" title="More">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>

                                        {activeMenu === user.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl z-50 border border-gray-100 py-1 text-left animate-scale-in"
                                            >
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    onClick={() => handleToggleStatus(user)}
                                                >
                                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" /> Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-400 italic">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal — portaled to body for full-page overlay */}
            {showAddModal && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" style={{ animation: 'scaleIn 0.25s ease-out' }} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 pt-6 pb-2">
                            <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
                            <button onClick={() => setShowAddModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="px-6 py-4">
                            {renderFormFields()}
                        </div>
                        <div className="flex justify-end gap-3 px-6 pb-6">
                            <button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleAddUser} className="btn btn-primary">Add User</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Edit User Modal — portaled to body for full-page overlay */}
            {showEditModal && editingUser && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} onClick={() => setShowEditModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4" style={{ animation: 'scaleIn 0.25s ease-out' }} onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 pt-6 pb-2">
                            <h3 className="text-lg font-bold text-gray-900">Edit User</h3>
                            <button onClick={() => setShowEditModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="px-6 py-4">
                            {renderFormFields()}
                        </div>
                        <div className="flex justify-end gap-3 px-6 pb-6">
                            <button onClick={() => setShowEditModal(false)} className="btn btn-secondary">Cancel</button>
                            <button onClick={handleSaveEdit} className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default UserManagement;
