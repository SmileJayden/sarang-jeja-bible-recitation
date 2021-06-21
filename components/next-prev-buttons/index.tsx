import { Button, Row, Spacer, Text } from "@geist-ui/react";
import { useMediaQuery } from "react-responsive";

type Props = {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevDisabled: boolean;
};

export default function NextPrevButtons({
  onNextClick,
  onPrevClick,
  prevDisabled,
}: Props) {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return (
    <Row
      style={
        isMobile ? { flexDirection: "column-reverse", padding: "0 16pt" } : {}
      }
    >
      <Button
        type={"secondary"}
        onClick={() => onPrevClick()}
        style={isMobile ? { width: "100%" } : {}}
        disabled={prevDisabled}
      >
        <Text span style={{ marginRight: "8px" }}>
          ⬅️
        </Text>
        이전 문제 풀기
      </Button>
      <Spacer x={1.25} />
      <Button
        type={"secondary"}
        onClick={() => onNextClick()}
        style={isMobile ? { width: "100%" } : {}}
      >
        다음 문제 풀기 ➡️
      </Button>
    </Row>
  );
}
