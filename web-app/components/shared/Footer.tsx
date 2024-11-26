import Link from 'next/link';
import React from 'react';
import { RxDiscordLogo } from 'react-icons/rx';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';
import { footerLinks } from '@/constants';

const socialLinks = [
  { name: 'discord', link: '', icon: <RxDiscordLogo className="size-6" /> },
  { name: 'github', link: '', icon: <FaGithub className="size-6" /> },
  { name: 'twiter', link: '', icon: <FaXTwitter className="size-6" /> },
  { name: 'youtube', link: '', icon: <FaYoutube className="size-6" /> },
];

export default function Footer() {
  const Socials = () => (
    <span className="flex">
      {socialLinks.map((social, index) => (
        <Link className="gradient-circle" href={social.link}>
          {social.icon}
        </Link>
      ))}
    </span>
  );
  const PageLinks = () => (
    <ul className="grid grid-cols-2 grid-rows-4 gap-5">
      {footerLinks.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <footer className="flex p-8 bg-[#202020] rounded-xl">
      <div className="m-auto flex gap-8">
        {PageLinks()}
        {Socials()}
      </div>
    </footer>
  );
}
