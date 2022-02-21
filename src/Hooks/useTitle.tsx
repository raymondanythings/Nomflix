import { useEffect, useState } from "react";

function useTitle(initialTitle: string) {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const titleDom = document.querySelector("title");
    if (titleDom) {
      titleDom.innerText = `Nomflix | ${title}`;
    }
  };
  useEffect(updateTitle, [title]);
  return setTitle;
}

export default useTitle;
