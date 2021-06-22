import { useState } from "react";
import cn from "classnames";
import { Badge, Tooltip } from "@geist-ui/react";
import {
  Emotion,
  iconByEmotion,
  iconColorByEmotion,
  tooltipMsgByEmotion,
} from "../../constants/emotion";
import { debounce } from "../../hooks";

type Props = {
  emotion: Emotion;
  count: number;
  onClick?: () => void;
  size?: string;
};

export default function EachEmotion({ emotion, count, onClick, size }: Props) {
  const [value, setValue] = useState(count);
  const [shake, setShake] = useState(false);

  const debouncedShake = debounce(() => setShake(false), 1000);

  const handleClick = () => {
    setShake(true);
    debouncedShake(false);
    setValue((prev) => prev + 1);
    onClick();
  };

  return (
    <Tooltip
      text={tooltipMsgByEmotion.get(emotion)}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      className={cn({ shake }, "emotion", emotion)}
    >
      <Badge.Anchor placement={"bottomRight"}>
        <Badge size="mini" style={{ userSelect: "none" }}>
          {value}
        </Badge>
        {iconByEmotion.get(emotion)({
          color: iconColorByEmotion.get(emotion),
          size,
        })}
      </Badge.Anchor>
    </Tooltip>
  );
}

EachEmotion.defaultProps = {
  size: "1.6rem",
};
