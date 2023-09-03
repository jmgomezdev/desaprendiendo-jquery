import Link from "next/link";

const menuItems = [
  {
    name: "Simple",
    href: "/v1",
  },
  {
    name: "Together",
    href: "/v2",
  },
  {
    name: "Reducer",
    href: "/v3",
  },
  {
    name: "Cliente",
    href: "/v4",
  },
  {
    name: "Clean",
    href: "/v5",
  },
  {
    name: "Hook Forms",
    href: "/v6",
  },
];

export default function Menu() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <svg viewBox="0 0 112.7 38.4" fill="currentColor" className="h-10 w-10">
          <g>
            <path d="M33.6,38.4l6-38.4h-12l-6,38.4H33.6z" />
            <path d="M21.6,38.4L12,0H0l9.6,38.4H21.6z" />
            <path d="M57.5,38.4L51.6,0h-12l6,38.4H57.5z" />
            <path fill="#E56A54" d="M69.5,38.4L79.1,0h-12l-9.6,38.4H69.5z" />
          </g>
          <g>
            <path d="M96.2,38.4H85.1V0h11.1V38.4z" />
            <polygon
              fill="#9678D3"
              points="96.2,10.8 102.2,0 112.7,0 112.7,10.8 	"
            />
          </g>
        </svg>
        <span className="hidden text-sm font-bold sm:inline-block md:text-lg">
          Aprende React Desaprendiendo Jquery
        </span>
      </Link>
      {menuItems?.length ? (
        <nav className="flex gap-6">
          {menuItems?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className="text-muted-foreground flex items-center text-sm font-medium"
                >
                  {item.name}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
