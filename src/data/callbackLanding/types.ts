export type CallbackProfile = {
  eyebrow: string;
  title: string;
  intro: string | string[];
  urgency: string | string[];
  reasons: string[];
};

export type CallbackOption = {
  id: string;
  name: string;
  route: string;
  tagline: string;
};
