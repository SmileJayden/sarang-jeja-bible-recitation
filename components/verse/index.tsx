import { IVerse } from "../../types";
import { Card, Text, Divider } from "@geist-ui/react";
import { getChapterLabel } from "../../utils";

interface VerseProps extends IVerse {
  showGroup?: boolean;
}

function Verse({ book, chapter, verse, contents, group, showGroup = false }: VerseProps) {
  return (
    <>
      {showGroup && group && (
        <Text h4 style={{ marginBottom: "0.5rem", marginTop: "1.5rem", color: "#0070f3" }}>
          {group}
        </Text>
      )}
      <Card shadow style={{ borderColor: "#79a8f7", borderWidth: "2.5px" }}>
        <Card.Content>
          <Text b h4>{`${book} ${chapter}${getChapterLabel(
            book
          )} ${verse}절`}</Text>
        </Card.Content>
        <Divider y={0} style={{ backgroundColor: "#9cc0ff" }} />
        <Card.Content>
          <Text
            blockquote
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{ __html: contents }}
          />
        </Card.Content>
      </Card>
    </>
  );
}

export default Verse;
