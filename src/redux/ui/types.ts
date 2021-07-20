import {MessageType} from 'react-native-flash-message';

export interface MessageBag {
  message?: string;
  description?: string;
  type?: MessageType;
}
