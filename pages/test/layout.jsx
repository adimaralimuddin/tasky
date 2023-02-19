import Link from "next/link";
import React from "react";

function layout(page) {
  return (
    <div>
      <div className="flex_ p-3 bg-green-600">
        <Link href="/test/dashboard">dashboard</Link>
        <Link href="/test/content">content</Link>
      </div>
      <div className="flex ">
        <div className="flex-1 max-w-[100px] col_ bg-blue-700 h-screen ">
          <Link href="/test/dashboard/task1">task1</Link>
          <Link href="/test/dashboard/task2">task2</Link>
        </div>
        {page}
      </div>
    </div>
  );
}

export default layout;
