import { Fragment } from "react";
import { Page, Spacer } from "@geist-ui/react";
import { IVerse } from "../../types";
import Verse from "../verse";

interface VersesListProps {
  verses: IVerse[];
}

function VersesList({ verses }: VersesListProps) {
  return (
    <Page.Content className={"contents-main"}>
      {verses.map((verse, i) => {
        const isFirstInGroup = i === 0 || verses[i - 1]?.group !== verse.group;
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

export default VersesList;
