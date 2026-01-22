
import { Link, useNavigate } from "react-router-dom";
import {
    Navbar as NavbarUI,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Badge,
    Button,
} from "@heroui/react";

import { FiSearch } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import { LuMessageCircleMore } from "react-icons/lu";
import logo from "../../assets/images/profile.png"

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import DarkMode from "../DarkModeToggle/DarkModeToggle";
import { IoMdMenu } from "react-icons/io";



export default function Navbar() {


    function getUserInfo() {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })

    }
    let { data, error, isError, isLoading } = useQuery({
        queryKey: ["UserInfo"],
        queryFn: getUserInfo,
        select: (data) => {
            return data.data.user
        }
    })

    console.log(data);



    let { userLogin, setUserLogin } = useContext(UserContext)
    let navigate = useNavigate()

    function logoutUser() {
        localStorage.removeItem("userToken")
        navigate("/login")

    }

    return (
        <>
            <NavbarUI isBordered maxWidth="xl">
                <NavbarBrand >
                    <Link to={"/"} className="flex flex-row items-center  gap-1" >
                        <img src={logo} alt="imgLogo" className="w-11" />
                        <p className="font-bold text-inherit text-xl ">ConnecSo</p>
                    </Link>
                </NavbarBrand>
                <NavbarBrand className="hidden md:flex">
                    <Input
                        classNames={{
                            base: "max-w-full  h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<FiSearch className="text-xl" />}
                        type="search"
                        radius="full"
                    />

                </NavbarBrand>


                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <NavbarItem>
                            <DropdownTrigger>

                                <NavbarBrand className="rounded-full cursor-pointer bg-gray-200 p-2 grow-0  dark:text-white dark:bg-black">
                                    <IoMdMenu className="text-2xl" />
                                </NavbarBrand>

                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu className="w-full min-w-0  ">
                            <DropdownItem key="theme"
                                className="font-extrabold"
                                description="Theme"
                                startContent={<DarkMode />}>

                            </DropdownItem>
                            <DropdownItem key="notifications"
                                className="font-extrabold"
                                description="Notifications"
                                startContent={<NavbarBrand className="rounded-full cursor-pointer bg-gray-200 p-2 grow-0  dark:text-white dark:bg-black">

                                    <Badge color="danger" content="5">
                                        <IoIosNotifications className="text-2xl" />
                                    </Badge>

                                </NavbarBrand>}>

                            </DropdownItem>
                            <DropdownItem key="messages"
                                className="font-extrabold"
                                description="Messages"
                                startContent={<NavbarBrand className="rounded-full cursor-pointer bg-gray-200 p-2 grow-0 dark:text-white dark:bg-black ">

                                    <Badge color="danger" content="5">
                                        <LuMessageCircleMore className="text-2xl" />
                                    </Badge>

                                </NavbarBrand>}>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>



                    {userLogin !== null ? <Dropdown placement="bottom-end">
                        <DropdownTrigger className="cursor-pointer">
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                name={data?.name}
                                size="sm"
                                src={data?.photo}
                            />
                        </DropdownTrigger  >
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{data?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings"> <Link to={"/profile"}>Profile</Link></DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={logoutUser}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> : <ul className="flex gap-4">
                        <NavbarItem as={Link} to="/login">Login</NavbarItem>
                        <NavbarItem as={Link} to="/register">Register</NavbarItem>
                    </ul>}

                </NavbarContent>
            </NavbarUI>
        </>
    )
}
