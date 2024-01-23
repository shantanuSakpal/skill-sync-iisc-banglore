"use client"
import { usePathname } from 'next/navigation';

function MyComponent() {
  const pathname = usePathname();
  const currentRoute = pathname.split('/').pop();

  // Rest of your component logic...

  return (
    <div>
      <p>Current Route: {currentRoute}</p>
      {/* Rest of your component JSX... */}
    </div>
  );
}

export default MyComponent;
