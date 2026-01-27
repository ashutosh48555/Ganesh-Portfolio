import BubbleMenu from "@/components/BubbleMenu";
import { navLinks } from "@/lib/data";

const menuItems = navLinks.map((link, index) => ({
  label: link.name.toLowerCase(),
  href: link.href,
  ariaLabel: link.name,
  rotation: index % 2 === 0 ? -6 : 6,
  hoverStyles: { 
    bgColor: 'hsl(42 58% 58%)', 
    textColor: '#ffffff' 
  }
}));

const Navigation = () => {
  return (
    <BubbleMenu
      logo="GANESH"
      items={menuItems}
      menuAriaLabel="Toggle navigation"
      menuBg="hsl(var(--card))"
      menuContentColor="hsl(var(--foreground))"
      useFixedPosition={true}
    />
  );
};

export default Navigation;
