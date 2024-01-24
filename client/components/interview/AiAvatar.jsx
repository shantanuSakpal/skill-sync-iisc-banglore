import React from "react";
import Image from "next/image";
import aiavatarimg from "@/public/images/ai-avatar.jpg";

export default function AiAvatar() {
  return (
    <div className="mx-auto w-full">
      <Image
        className="mx-auto "
        alt="ai paersn"
        src={aiavatarimg}
        width={300}
        height={300}
      />
    </div>
  );
}
