import {forEach, isString} from 'lodash';
import {MessageType, showMessage} from 'react-native-flash-message';
import {AppDispatch} from '~/redux/root-store';
import {notify} from '~/redux/ui/slice';
import {ValidationErrors} from '~/hooks/useInput';

const messageType: {[key: string]: MessageType} = {
  error: 'danger',
  success: 'success',
};

export function useNotification(dispatch: AppDispatch) {
  const addMessage = (message: string, description: string | undefined = undefined, type: keyof typeof messageType = 'error') => {
    if (!isString(message)) {
      throw new Error('Message must be a string!');
    }

    dispatch(notify({message, description, type: messageType[type]}));

    showMessage({
      message,
      description,
      type: messageType[type],
    });
  };

  const addValidationMessage = (
    errors: ValidationErrors = {},
    description?: string | undefined,
    type?: keyof typeof messageType,
  ) => {
    let messages: string[] = [];

    forEach(errors as ValidationErrors, (itemMessages: string[]) => {
      messages = messages.concat(itemMessages);
    });

    const message = messages.join('\n');

    addMessage(message, description, type);
  };
  return {addMessage, addValidationMessage};
}
