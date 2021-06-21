import { Fragment } from "react";
import { Page, Spacer } from "@geist-ui/react";
import { ALL_VERSES } from "../../constants/verses";
import Verse from "../../components/verse";

function AllVerses() {
  return (
    <Page.Content className={"contents-main"}>
      {ALL_VERSES.map((verse, i) => (
        <Fragment key={i}>
          <Verse {...verse} />
          <Spacer y={1.5} />
        </Fragment>
      ))}
    </Page.Content>
  );
}

export default AllVerses;
