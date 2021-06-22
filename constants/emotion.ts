import {
  HeartFill,
  Emoji,
  ThumbsUp,
  CloudDrizzle,
  BatteryCharging,
  Users,
  Icon,
} from "@geist-ui/react-icons";

export enum Emotion {
  LOVE_AND_BLESSING = "love-and-blessing",
  GOOD = "good",
  THUMBS_UP = "thumbs-up",
  SAD = "sad",
  CHEER_UP = "cheer-up",
  PRAY_WITH = "pray-with",
}

export const iconByEmotion = new Map<Emotion, Icon>([
  [Emotion.LOVE_AND_BLESSING, HeartFill],
  [Emotion.GOOD, Emoji],
  [Emotion.THUMBS_UP, ThumbsUp],
  [Emotion.SAD, CloudDrizzle],
  [Emotion.CHEER_UP, BatteryCharging],
  [Emotion.PRAY_WITH, Users],
]);

export const iconColorByEmotion = new Map<Emotion, string>([
  [Emotion.LOVE_AND_BLESSING, "red"],
  [Emotion.GOOD, "orange"],
  [Emotion.THUMBS_UP, "green"],
  [Emotion.SAD, "blue"],
  [Emotion.CHEER_UP, "navy"],
  [Emotion.PRAY_WITH, "purple"],
]);

export const tooltipMsgByEmotion = new Map<Emotion, string>([
  [Emotion.LOVE_AND_BLESSING, "사랑하고 축복합니다 🥰"],
  [Emotion.GOOD, "좋아요 🙌"],
  [Emotion.THUMBS_UP, "최고에요 👍"],
  [Emotion.SAD, "슬퍼요 🥲"],
  [Emotion.CHEER_UP, "힘을내요 💪"],
  [Emotion.PRAY_WITH, "함께 기도할게요 🙏"],
]);
