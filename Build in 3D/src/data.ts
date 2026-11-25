export interface EventItem {
  id: number;
  code: string;
  title: string;
  tagline: string;
  description: string;
  prize: string;
  team: string;
  color: string;
  shape: "icosa" | "torusKnot" | "octa" | "dodeca" | "torus" | "capsule";
}

export const EVENTS: EventItem[] = [
  {
    id: 0,
    code: "EV-01",
    title: "Overclock",
    tagline: "36-hour hackathon",
    description:
      "Build something that shouldn't exist yet. Teams get 36 hours, unlimited caffeine, and access to mentors from the world's top labs.",
    prize: "₹5,00,000",
    team: "2–4 members",
    color: "#38f5ff",
    shape: "icosa",
  },
  {
    id: 1,
    code: "EV-02",
    title: "Mechatron",
    tagline: "Combat robotics arena",
    description:
      "Steel, sparks and strategy. 15 kg bots go head to head in a reinforced arena. Only one leaves with its chassis intact.",
    prize: "₹3,00,000",
    team: "Up to 6",
    color: "#ff3cf0",
    shape: "torusKnot",
  },
  {
    id: 2,
    code: "EV-03",
    title: "Neural Drift",
    tagline: "AI model showdown",
    description:
      "Train, fine-tune and deploy. Compete on a live leaderboard across vision, language and reinforcement learning tracks.",
    prize: "₹2,50,000",
    team: "1–3 members",
    color: "#b6ff3c",
    shape: "octa",
  },
  {
    id: 3,
    code: "EV-04",
    title: "Zero Gravity",
    tagline: "Drone racing league",
    description:
      "FPV pilots thread a neon-lit course at 120 km/h. Fastest lap wins, but a single clipped gate ends the run.",
    prize: "₹2,00,000",
    team: "Solo pilot",
    color: "#ffb03c",
    shape: "dodeca",
  },
  {
    id: 4,
    code: "EV-05",
    title: "Ciphertext",
    tagline: "Capture the flag",
    description:
      "Reverse engineering, web exploitation, cryptography and forensics. 48 challenges, 24 hours, one scoreboard.",
    prize: "₹1,50,000",
    team: "Up to 4",
    color: "#8a5cff",
    shape: "torus",
  },
  {
    id: 5,
    code: "EV-06",
    title: "Prototype",
    tagline: "Hardware showcase",
    description:
      "Bring working prototypes to the exhibition floor. Pitch to VCs, industry judges and 40,000 visitors over three days.",
    prize: "Incubation",
    team: "Open",
    color: "#ff6b6b",
    shape: "capsule",
  },
];

export interface ScheduleItem {
  day: string;
  date: string;
  theme: string;
  slots: { time: string; title: string; venue: string }[];
}

export const SCHEDULE: ScheduleItem[] = [
  {
    day: "DAY 01",
    date: "Jan 16",
    theme: "Ignition",
    slots: [
      { time: "09:00", title: "Opening Ceremony & Keynote", venue: "Main Dome" },
      { time: "11:00", title: "Overclock Hackathon begins", venue: "Hangar B" },
      { time: "14:00", title: "Mechatron — Qualifiers", venue: "Arena" },
      { time: "19:00", title: "Drone Light Show", venue: "Open Grounds" },
    ],
  },
  {
    day: "DAY 02",
    date: "Jan 17",
    theme: "Acceleration",
    slots: [
      { time: "10:00", title: "Neural Drift — Live Leaderboard", venue: "Lab 4" },
      { time: "12:00", title: "Fireside: Building for 1B users", venue: "Main Dome" },
      { time: "16:00", title: "Zero Gravity — Time Trials", venue: "Sky Track" },
      { time: "21:00", title: "Synthwave Night", venue: "Open Grounds" },
    ],
  },
  {
    day: "DAY 03",
    date: "Jan 18",
    theme: "Singularity",
    slots: [
      { time: "09:00", title: "Ciphertext CTF — Final Hours", venue: "Lab 2" },
      { time: "13:00", title: "Mechatron — Grand Finale", venue: "Arena" },
      { time: "17:00", title: "Prototype Exhibition Awards", venue: "Hangar A" },
      { time: "19:30", title: "Closing Ceremony", venue: "Main Dome" },
    ],
  },
];

export interface Speaker {
  name: string;
  role: string;
  org: string;
  topic: string;
  initials: string;
  hue: string;
}

export const SPEAKERS: Speaker[] = [
  { name: "Dr. Amara Okafor", role: "Head of Robotics", org: "Helion Dynamics", topic: "Humanoids at scale", initials: "AO", hue: "#38f5ff" },
  { name: "Kenji Watanabe", role: "Chief Scientist", org: "Quantum Loop", topic: "Error-corrected qubits", initials: "KW", hue: "#ff3cf0" },
  { name: "Priya Raghavan", role: "Founder & CEO", org: "Nimbus AI", topic: "Agents that ship code", initials: "PR", hue: "#b6ff3c" },
  { name: "Lucas Ferreira", role: "Mission Lead", org: "Orbital Works", topic: "Reusable upper stages", initials: "LF", hue: "#ffb03c" },
  { name: "Sofia Lindqvist", role: "Principal Engineer", org: "Mesh Labs", topic: "Post-silicon compute", initials: "SL", hue: "#8a5cff" },
  { name: "Arjun Mehta", role: "Security Researcher", org: "Null Sector", topic: "Breaking the unbreakable", initials: "AM", hue: "#ff6b6b" },
];

export const SPONSORS = [
  "HELION", "QUANTUM LOOP", "NIMBUS AI", "ORBITAL WORKS", "MESH LABS", "NULL SECTOR", "VOLTA", "KAIROS", "SYNTH", "APEX CLOUD",
];

export const STATS = [
  { value: 40, suffix: "K+", label: "Footfall" },
  { value: 120, suffix: "+", label: "Events" },
  { value: 2, suffix: "Cr", label: "Prize pool", prefix: "₹" },
  { value: 500, suffix: "+", label: "Colleges" },
];
