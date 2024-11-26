'use client';

import { IoHomeOutline } from 'react-icons/io5';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsQuestionSquare } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navbarLinks = [
  { name: 'Home', link: '', icon: <IoHomeOutline className="size-5" /> },
  {
    name: 'Schedule an Appoitment',
    link: '/schedule',
    icon: <RiCalendarScheduleLine className="size-5" />,
  },
  {
    name: 'About',
    link: '/about',
    icon: <IoIosInformationCircleOutline className="size-5" />,
  },
  { name: 'FAQ', link: '/faq', icon: <BsQuestionSquare className="size-5" /> },
  {
    name: 'Contact Us',
    link: '/contact-us',
    icon: <FiMail className="size-5" />,
  },
  {
    name: 'refusal of appointment ',
    link: '/refusal',
    icon: <RiDeleteBin6Line className="size-5" />,
    red: true,
  },
];

function Navbar() {
  const pathName = usePathname();

  return (
    <nav className=" shadow-lg flex items-center justify-center h-14 gap-9 p-3 dark:bg-[#202020] bg-white rounded-full text-sm">
      {/* <div className="container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <div className="flex gap-4 items-center ">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div> */}
      <ThemeToggle />
      {navbarLinks.map((item) => (
        <Link
          href={item.link}
          key={item.name}
          className={cn(' h-full flex items-center rounded-full gap-3 px-3', {
            'text-[#FF0707]': item.red,
            'dark:bg-[#363636] bg-[#D8D6D6]': pathName.includes(item.link),
          })}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
export default Navbar;
