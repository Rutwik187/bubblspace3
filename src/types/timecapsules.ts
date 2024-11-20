export interface Microlearning {
  subtype: string;
  description: string;
  userid: string;
  status: string;
  title: string;
  type: string;
  "userID#sessionID": string;
  timecapsuleid: string;
  category: string;
  difficulty: string;
  duration: number;
  rating: number;
  featured: boolean;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  skills: string[];
}
