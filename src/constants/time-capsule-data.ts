interface MLTimeCapsule {
  id: number;
  title: string;
  description: string;
  trainingDate: string;
  category: string;
}

export const mlTimeCapsules: MLTimeCapsule[] = [
  {
    id: 1,
    title: "Neural Network Architect",
    description:
      "Trained on deep learning architectures and optimization techniques",
    trainingDate: "2023-05-15",
    category: "Deep Learning",
  },
  {
    id: 2,
    title: "Reinforcement Learning Master",
    description: "Educated with RL algorithms and game theory principles",
    trainingDate: "2023-07-22",
    category: "Reinforcement Learning",
  },
  {
    id: 3,
    title: "NLP Wizard",
    description:
      "Informed by latest advancements in natural language processing",
    trainingDate: "2023-09-10",
    category: "Natural Language Processing",
  },
  {
    id: 4,
    title: "Computer Vision Expert",
    description: "Trained on image recognition and object detection models",
    trainingDate: "2023-11-05",
    category: "Computer Vision",
  },
];
