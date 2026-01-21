import { BiTrendingUp } from "react-icons/bi";


const RightSidebar = () => {
    const trendingItems = [
        { id: 1, name: 'Go Topless Day', count: '47K', description: 'people talking about this' },
        { id: 2, name: 'Los Angeles International Airport', count: '39K', description: 'people talking about this' },
        { id: 3, name: 'Mila Kunis', count: '11K', description: 'people talking about this' },
    ];

    const languages = [
        { id: 1, name: 'English (US)', active: true },
        { id: 2, name: 'Español', active: false },
        { id: 3, name: 'Português (Brasil)', active: false },
        { id: 4, name: 'Français (France)', active: false },
        { id: 5, name: 'Deutsch', active: false },
    ];

    const footerLinks = [
        { id: 1, name: 'Privacy' },
        { id: 2, name: 'Terms' },
        { id: 3, name: 'Advertising' },
        { id: 4, name: 'Ad Choices', url: 'https://www.facebook.com/privacy/explanation' },
        { id: 5, name: 'Cookies' },
        { id: 6, name: 'More' },
    ];

    return (
        <div className="pt-4 rounded-lg w-[80%] mx-auto "> 
            {/* TRENDING Section */}
            <div className="p-5 border-b border-gray-200  bg-white   dark:bg-black dark:text-white ">
                <div className="flex flex-row items-center mb-3 ">
                    <BiTrendingUp className="text-3xl text-blue-400 me-1 "/>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white ">TRENDING</h2>
                </div>

                <div className="space-y-4">
                    {trendingItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start p-1 dark:text-white dark:hover:bg-blue-400 dark:hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-900 truncate dark:text-white ">{item.name}</p>
                                <p className="text-xs text-gray-500 mt-1 dark:text-white ">
                                    {item.count} {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <a
                    href="#"
                    className=" dark:hover:bg-blue-500 dark:text-white block text-center text-blue-600 text-sm font-medium mt-4 p-2 hover:bg-gray-50 rounded-md hover:underline"
                >
                    See More
                </a>
            </div>

            {/* SUGGESTED PAGES Section */}
            <div className="p-4 border-b border-gray-200  bg-white  dark:bg-black ">
                <h2 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">SUGGESTED PAGES</h2>

                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Startups In The Sky</p>
                        <p className="text-xs text-gray-500 dark:text-white">Community · 258 likes</p>
                    </div>
                </div>

                <button className=" dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400 w-full bg-blue-50 text-blue-600 text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-100 transition-colors duration-150 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    Like Page
                </button>
            </div>

            {/* Footer Section */}
            <div className="p-4  bg-white dark:bg-black ">
                <div className="flex flex-wrap gap-2 mb-4">
                    {languages.map((lang) => (
                        <a
                            key={lang.id}
                            href="#"
                            className={`text-xs ${lang.active ? 'text-blue-600 font-medium' : 'dark:text-white dark:hover:text-white text-gray-500 hover:text-gray-700'}`}
                        >
                            {lang.name}
                        </a>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {footerLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url || "#"}
                            className="text-xs dark:text-white  text-gray-500 hover:text-gray-700 hover:underline dark:hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <p className="text-xs dark:text-white text-gray-500">ConnecSo © 2026</p>
            </div>
        </div>
    );
};

export default RightSidebar;