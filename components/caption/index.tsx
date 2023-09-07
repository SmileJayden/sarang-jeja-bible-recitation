import { useRouter } from "next/router";
import { Text } from "@geist-ui/react";
import { PageTitle } from "../../constants/titles";

export default function Caption() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      style={{ all: "unset", position: "absolute", top: 0, cursor: "pointer" }}
      onClick={handleClick}
    >
      <Text>{PageTitle.HOME}</Text>
    </button>
  );
}
