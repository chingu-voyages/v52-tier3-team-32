type NavLink = {
  href: string;
  label: string;
};

// dynamic links you just need to add more rows here and make a page
// to get an other page which is included in dropdown menu
export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/admin ", label: "admin" },
];
