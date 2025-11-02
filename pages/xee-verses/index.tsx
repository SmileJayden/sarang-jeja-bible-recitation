import { Fragment } from "react";
import { Page, Spacer } from "@geist-ui/react";
import { XEE_VERSES } from "../../constants/verses";
import Verse from "../../components/verse";

function XeeVerses() {
  return (
    <Page.Content className={"contents-main"}>
      {XEE_VERSES.map((verse, i) => (
        <Fragment key={i}>
          <Verse {...verse} />
          <Spacer y={1.5} />
        </Fragment>
      ))}
    </Page.Content>
  );
}

export default XeeVerses;
