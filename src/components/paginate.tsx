import { Link } from "@tanstack/react-router";

interface PaginateProps {
  next: string;
  prev: string;
}

export default function Paginate({ next, prev }: PaginateProps) {
  return (
    <div className="flex justify-between space-x-3 font-light text-xs">
      <Link to="/chapter/$slug" params={{ slug: prev }}>
        Previous
      </Link>
      <Link to="/toc">Lakehouse Stories</Link>
      <Link to="/chapter/$slug" params={{ slug: next }}>
        Next
      </Link>
    </div>
  );
}
