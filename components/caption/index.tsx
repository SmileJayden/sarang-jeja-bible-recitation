import NextLink from "next/link";
import { Text } from "@geist-ui/react";
import { PageTitle } from "../../constants/titles";
import { LinkPath } from "../../constants/links";

export default function Caption() {
  return (
    <div
      style={{ all: "unset", position: "absolute", top: 0, cursor: "pointer" }}
    >
      <NextLink href={LinkPath.HOME}>
        <Text>{PageTitle.HOME}</Text>
      </NextLink>
    </div>
  );
}
