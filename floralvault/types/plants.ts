export interface Plant {
  id: string;
  scientific_name: string;
  common_name?: string;
  slug: string;
  origin: string;
  family: string;
  type:
    | "herb"
    | "tree"
    | "shrub"
    | "flower"
    | "succulent"
    | "cactus"
    | "fern"
    | "bamboo"
    | "grass"
    | "vine"
    | "bulb"
    | "aquatic"
    | "mushroom";
  imageUrl: string;
  description: string;
  userId: string;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface EditSuggestion {
  id: string;
  plantId: string;
  suggestedBy: string; // userId
  fields: Partial<Plant>; // only the fields being suggested
  reason?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string; // userId
}
