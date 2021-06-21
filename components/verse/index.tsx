import { IVerse } from "../../types";
import { Card, Text, Divider } from "@geist-ui/react";

function Verse({ book, chapter, verse, contents }: IVerse) {
  return (
    <Card shadow style={{ borderColor: "#79a8f7", borderWidth: "2.5px" }}>
      <Card.Content>
        <Text b h4>{`${book} ${chapter}장 ${verse}절`}</Text>
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
  );
}

export default Verse;
