export const IMG = {
  robo: "https://images.pexels.com/photos/9242834/pexels-photo-9242834.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  roboArm:
    "https://images.pexels.com/photos/8438952/pexels-photo-8438952.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  crawler:
    "https://images.pexels.com/photos/39971200/pexels-photo-39971200.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  drone:
    "https://images.pexels.com/photos/12888404/pexels-photo-12888404.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  droneKit:
    "https://images.pexels.com/photos/14828474/pexels-photo-14828474.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  laser:
    "https://images.pexels.com/photos/36670198/pexels-photo-36670198.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  concert:
    "https://images.pexels.com/photos/13146328/pexels-photo-13146328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dj: "https://images.pexels.com/photos/8448561/pexels-photo-8448561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  crowd:
    "https://images.pexels.com/photos/7081160/pexels-photo-7081160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  stage:
    "https://images.pexels.com/photos/31129059/pexels-photo-31129059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  keynote:
    "https://images.pexels.com/photos/29708258/pexels-photo-29708258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const COMPETITIONS = [
  {
    tag: "Flagship",
    name: "Robowars",
    prize: "₹12,00,000",
    blurb:
      "India's biggest combat robotics arena. 60-kg bots, titanium blades, 20,000 spectators losing their minds.",
    img: IMG.robo,
    accent: "from-amber-400/80 to-rose-500/40",
  },
  {
    tag: "International",
    name: "Full Throttle",
    prize: "₹6,00,000",
    blurb:
      "A decade of RC nitro buggy racing. Hand-built chassis, 70 kmph straights, zero forgiveness.",
    img: IMG.crawler,
    accent: "from-cyan-300/80 to-blue-600/40",
  },
  {
    tag: "Autonomous",
    name: "RoboRacer",
    prize: "₹5,00,000",
    blurb:
      "No drivers. Pure perception stacks, SLAM and control loops wrestling for the apex.",
    img: IMG.roboArm,
    accent: "from-violet-400/80 to-fuchsia-600/40",
  },
  {
    tag: "League",
    name: "Int'l Drone Racing",
    prize: "₹8,00,000",
    blurb:
      "FPV goggles on, 140 kmph through a neon gate circuit built over the Powai lakefront.",
    img: IMG.drone,
    accent: "from-emerald-300/80 to-teal-600/40",
  },
  {
    tag: "Code",
    name: "Blixathon",
    prize: "₹4,00,000",
    blurb:
      "36 hours, one problem statement, industry mentors and far too much filter coffee.",
    img: IMG.keynote,
    accent: "from-orange-300/80 to-amber-600/40",
  },
  {
    tag: "Vision",
    name: "VisionX Challenge",
    prize: "₹3,50,000",
    blurb:
      "Edge AI on constrained silicon — ship a model that sees, decides and survives the demo.",
    img: IMG.droneKit,
    accent: "from-sky-300/80 to-indigo-600/40",
  },
];

export const SPEAKERS = [
  { name: "Dr. A.P.J. Abdul Kalam", role: "Former President of India", year: "2015" },
  { name: "Serge Haroche", role: "Nobel Laureate, Physics", year: "2016" },
  { name: "Amartya Sen", role: "Nobel Laureate, Economics", year: "2013" },
  { name: "Bjarne Stroustrup", role: "Creator of C++", year: "2015" },
  { name: "Vint Cerf", role: "Father of the Internet", year: "2015" },
  { name: "The 14th Dalai Lama", role: "Nobel Laureate, Peace", year: "2019" },
  { name: "Jimmy Wales", role: "Founder, Wikipedia", year: "2017" },
  { name: "S. Somanath", role: "Chairman, ISRO", year: "2023" },
  { name: "N.R. Narayana Murthy", role: "Founder, Infosys", year: "2025" },
  { name: "Gen. Anil Chauhan", role: "Chief of Defence Staff", year: "2025" },
  { name: "Rakesh Sharma", role: "First Indian in Space", year: "2017" },
  { name: "Ada Yonath", role: "Nobel Laureate, Chemistry", year: "2018" },
];

export const WORKSHOPS = [
  "Generative AI & LLMs",
  "Cloud with Microsoft",
  "Ethical Hacking",
  "Quadcopter Build",
  "Autonomous Driving",
  "Quantum Computing",
  "Algorithmic Trading",
  "Embedded Robotics",
  "AR / XR Design",
  "Cybersecurity Ops",
  "Bio-Nanotech",
  "Game Dev Studio",
];

export const STATS = [
  { value: 180000, suffix: "+", label: "Footfall", fmt: "k" },
  { value: 300, suffix: "+", label: "Events & Competitions" },
  { value: 2500, suffix: "+", label: "Colleges Reached" },
  { value: 30, suffix: "th", label: "Edition, Since 1998" },
];
