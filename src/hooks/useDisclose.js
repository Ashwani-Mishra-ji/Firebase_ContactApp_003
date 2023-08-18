import { useState } from "react";


const useDisclose = () => {
    const [isopen, setopen] = useState(false);

    const onOpen = () => {
      setopen(true);
    };
    const onclose = () => {
      setopen(false);
    };
  return (
   {onOpen,onclose,isopen}
  )
}

export default useDisclose
