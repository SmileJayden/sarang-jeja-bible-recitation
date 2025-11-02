import { Fragment } from "react";
import { Page, Spacer } from "@geist-ui/react";
import { VERSES_72_E } from "../../../constants/verses";
import Verse from "../../../components/verse";

function BeLikeChrist() {
  return (
    <Page.Content className={"contents-main"}>
      {VERSES_72_E.map((verse, i) => {
        const isFirstInGroup = i === 0 || VERSES_72_E[i - 1].group !== verse.group;
        return (
          <Fragment key={i}>
            <Verse {...verse} showGroup={isFirstInGroup} />
            <Spacer y={1.5} />
          </Fragment>
        );
      })}
    </Page.Content>
  );
}

export default BeLikeChrist;
