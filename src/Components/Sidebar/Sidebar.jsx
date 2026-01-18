

import { RiHome2Fill } from "react-icons/ri";
import { FaFlag, FaStar, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";



const menuOptions = [
    {
        label: 'Home',
        icon: <RiHome2Fill size={20} className="text-blue-500" />,
        bgColor: 'bg-blue-500/10',
        path: '/home'
    },
    {
        label: 'Friends',
        icon: <FaUserFriends size={20} className="text-green-500" />,
        bgColor: 'bg-green-500/10 ',
        path: '/Friends'
    },
    {
        label: 'Groups',
        icon: <FaUsers size={20} className="text-orange-500" />,
        bgColor: 'bg-orange-500/10',
        path: '/groups'
    },
    {
        label: 'Marketplace',
        icon: <FaStore size={20} className="text-violet-500" />,
        bgColor: 'bg-violet-500/10 ',
        path: '/marketplace'
    },
    {
        label: 'Saved',
        icon: <FaBookmark size={20} className="text-red-500" />,
        bgColor: 'bg-red-500/10',
        path: '/saved'
    },
    {
        label: 'Pages',
        icon: <FaFlag size={20} className="text-blue-500" />,
        bgColor: 'bg-blue-500/10',
        path: '/pages'
    },
    {
        label: 'Favorites',
        icon: <FaStar size={20} className="text-yellow-500" />,
        bgColor: 'bg-yellow-500/10',
        path: '/favorites'
    },
]

const myGroups = [
    {
        groupName: 'Music Lovers',
        groupIcon: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop'
    },
    {
        groupName: 'Tech Innovators',
        groupIcon: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop'
    },
    {
        groupName: 'Travel Explorers',
        groupIcon: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop'
    },
    {
        groupName: 'Book Club',
        groupIcon: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=100&h=100&fit=crop'
    }
]

export default function Sidebar() {
    return (
        <div className=" pt-4 rounded-lg w-[80%] m-auto  ">
            <div className="flex flex-col gap-1 ">
                {menuOptions.map((option) => (
                    <NavLink
                        key={option.label}
                        to={option.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                ? 'bg-blue-100 text-blue-600  '
                                : 'hover:bg-gray-200 text-gray-700 dark:hover:bg-gray-100 dark:hover:text-black dark:text-white'
                            }`
                        }
                    >
                        <div className={`${option.bgColor} p-2 rounded-lg text-white flex items-center justify-center`}>
                            {option.icon}
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                    </NavLink>
                ))}
            </div>

            <div className="mt-6 ">
                <h2 className="text-xl font-bold text-gray-800 mb-4 px-3 dark:text-white">My Groups</h2>
                    {myGroups.map((group) => (
                        <button
                            key={group.groupName}
                            className=" flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer transition-all text-left"
                        >
                            <img
                                src={group.groupIcon}
                                alt={group.groupName}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <p className="text-sm dark:text-white  font-medium text-gray-700">{group.groupName}</p>
                        </button>
                    ))}
                
            </div>
        </div>
    )
}
