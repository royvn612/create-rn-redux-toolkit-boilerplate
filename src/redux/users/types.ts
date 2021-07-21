interface UserOrg {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  name?: string;
  preferredName?: string;
  profilePicture?: string;
  email?: string;
  isConsentAccepted?: boolean;
  isActive?: boolean;
}

export interface UserModel extends UserOrg {}

export interface UserSchema extends UserModel {}

export interface UserEntities {
  users: {[key: string]: UserSchema};
}
