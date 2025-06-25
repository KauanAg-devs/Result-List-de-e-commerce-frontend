export type OverviewSectionProps = {
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
  setPickedMethod: React.Dispatch<React.SetStateAction<string>>;
  userInfo: {
    name: string;
    email: string;
    phone: string;
    role: string;
    memberSince: string;
    address: string;
  };
};
