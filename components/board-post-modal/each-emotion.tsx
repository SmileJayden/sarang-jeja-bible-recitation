import { useEffect, useState } from "react";
import cn from "classnames";
import { Badge, Tooltip } from "@geist-ui/react";
import {
  Emotion,
  iconByEmotion,
  iconColorByEmotion,
  tooltipMsgByEmotion,
} from "../../constants/emotion";

type Props = {
  emotion: Emotion;
  count: number;
  onClick?: () => void;
  size?: string;
};

export default function EachEmotion({ emotion, count, onClick, size }: Props) {
  const [value, setValue] = useState(count);
  const [shakeAt, setShakeAt] = useState(0);
  const [shake, setShake] = useState(false);

  const handleClick = () => {
    setShakeAt((p) => p + 1);
    setValue((prev) => prev + 1);
    onClick?.();
  };

  useEffect(() => {
    if (shakeAt > 0) {
      setShake(true);
      const pid = window.setTimeout(() => {
        setShake(false);
      }, 600);
      return () => {
        window.clearTimeout(pid);
      };
    }
  }, [shakeAt]);

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
        {iconByEmotion.get(emotion)?.({
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
