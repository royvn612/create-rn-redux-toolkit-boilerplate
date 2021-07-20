import {ContraceptiveMethodKeys} from '~/redux/contraceptive-methods/types';
import {UserActivityLogValues} from '~/redux/user-activity-logs/types';

export interface UserActivityIcon {
  value: UserActivityLogValues;
  label: string;
  type: {value: string};
  icon: string;
}
export interface UserAnswer {
  id: number;
  contraceptiveMethod: {
    label: string;
    value: ContraceptiveMethodKeys;
    isHormonal: boolean;
    activities: Record<string, UserActivityIcon>;
    calendarPatterns: any;
  };
  data: {
    answers: {};
    insight: string[];
    purpose: string[];
    startDate: string;
    dailyAt?: string;
    isHormonal: true;
    contraceptiveMethodKey: ContraceptiveMethodKeys;
  };
  active: true;
  brands: {};
}

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
  isPasswordSet?: boolean;
  userAnswer?: UserAnswer;
}

export interface UserModel extends UserOrg {}

export interface UserSchema extends UserModel {}

export interface UserEntities {
  users: {[key: string]: UserSchema};
}
