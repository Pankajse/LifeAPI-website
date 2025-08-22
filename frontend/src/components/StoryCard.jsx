import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"

const StoryCard = ({ story }) => {

  return (
    <div className="flex flex-col gap-3 shadow-lg hover:shadow-xl bg-white p-5 rounded-2xl "> 
      {/* Header */}
      <div className="flex gap-3 items-center">
        <img
          src="https://alchetron.com/cdn/narendra-modi-445ae088-7c71-40ed-a7d0-c21aaf4512b-resize-750.jpeg"
          alt="profile"
          className="w-15 h-15 rounded-full"
        />
        <div>
          <h5 className="text-base font-medium">Pankaj Singh</h5>
          <h6 className="text-sm text-[#696969]">23 Dec 2024</h6>
        </div>
      </div>

      {/* Comment */}
      <ScrollArea className=" h-50 border-0  rounded-md px-1  ">
  Jokester began sneaking into the castle in the middle of the night and leaving
  jokes all over the place: under the king's pillow, in his soup, even in the
  royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
  then, one day, the people of the kingdom 
</ScrollArea>

      {/* Footer */}
      <h5 className="text-sm font-medium text-[#696969]">First time Donor</h5>
    </div>
  );
};

export default StoryCard;
