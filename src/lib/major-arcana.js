import Sentencer from "sentencer";

const FoolSentencer = Sentencer.use({
  nounList: [
    "Fool",
    "card",
    "opportunity",
    "man",
    "outset",
    "journey",
    "cliff",
    "edge",
    "step",
    "heart",
    "matter",
    "leap",
    "faith",
    "time",
    "trust",
    "journey",
    "Fool",
    "mind",
    "sense",
    "caution",
    "wind",
    "fear",
    "anxiety",
    "growth",
    "development",
    "adventure",
    "time",
    "leap",
    "faith",
    "way",
    "journey",
    "someone",
    "light",
    "sign",
    "time",
    "opportunity",
    "right",
    "world",
    "oyster",
    "mind",
    "dash",
    "spontaneity",
    "time",
    "Fool",
    "invitation",
    "life",
    "experiment",
    "flow",
    "card",
    "spirit",
    "energy",
    "place",
    "wonderment",
    "curiosity",
    "life",
    "child",
    "dance",
    "heart",
    "card",
    "dread",
    "Fool",
    "guide",
    "someone",
    "embodiment",
    "spirit",
    "child",
    "time",
    "experience",
    "fear",
    "essence",
    "Fool",
    "fear",
    "future",
    "Fool",
    "step",
    "escort",
    "chance",
  ],
  adjectiveList: [
    "new",
    "young",
    "crazy",
    "new",
    "open",
    "curious",
    "ready",
    "unknown",
    "new",
    "personal",
    "ready",
    "essential",
    "green",
    "ready",
    "great",
    "potential",
    "creative",
    "magical",
    "new",
    "powerful",
    "big",
    "beautiful",
    "carefree",
    "potential",
    "free",
    "excellent",
    "daring",
    "free",
    "inner",
    "playful",
    "unknown",
    "trusting",
  ],
});

const MagicianSentencer = Sentencer.use({
  nounList: [
    "master",
    "Magician",
    "energy",
    "right",
    "fire",
    "earth",
    "air",
    "water",
    "energy",
    "manifestation",
    "powerhouse",
    "impact",
    "alchemy",
    "time",
    "move",
    "idea",
    "action",
    "intention",
    "knowledge",
    "life",
    "path",
    "reality",
    "quest",
    "vision",
    "ego",
    "money",
    "status",
    "fame",
    "soul",
    "connection",
    "opportunity",
    "alignment",
    "future",
    "Magician",
    "attention",
    "concentration",
    "move",
    "task",
    "drop",
    "track",
  ],
  adjectiveList: [
    "spiritual",
    "physical",
    "mental",
    "emotional",
    "manifest",
    "spiritual",
    "key",
    "separate",
    "perfect",
    "potential",
    "ready",
    "manifest",
    "clear",
    "powerful",
    "creative",
    "day-to-day",
    "clear",
    "intense",
    "essential",
    "methodical",
    "sure",
  ],
});

const MajorArcana = { fool: FoolSentencer, magician: MagicianSentencer };

export default MajorArcana;
