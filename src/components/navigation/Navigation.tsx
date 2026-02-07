import BubbleMenu from "./BubbleMenu";
import { navLinks } from "@/lib/data";

const menuItems = navLinks.map((link, index) => ({
  label: link.name.toLowerCase(),
  href: link.href,
  ariaLabel: link.name,
  rotation: index % 2 === 0 ? -8 : 8,
  hoverStyles: {
    bgColor: 'hsl(42 58% 58%)',
    textColor: '#ffffff'
  }
}));

const Navigation = () => {
  return (
    <BubbleMenu
      logo={<span className="font-bold tracking-tighter">GANESH</span>}
      items={menuItems}
      menuAriaLabel="Toggle navigation"
      menuBg="hsl(var(--card))"
      menuContentColor="hsl(var(--foreground))"
      useFixedPosition={true}
    />
  );
};

export default Navigation;
