export type UserProfile = {
  name: string | null;
  email: string;
  phone: string | null;
  profileImage: string | ArrayBuffer | null;

  addressData?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
  };
};
