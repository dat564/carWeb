import { VALIDATE_MESSAGE } from '@/constants/validate';

export const getRule = (type) => {
  switch (type) {
    case 'email':
      return {
        type: 'email',
        message: VALIDATE_MESSAGE.email
      };
    case 'required':
      return {
        required: true,
        message: VALIDATE_MESSAGE.required
      };
    case 'phone':
      return {
        pattern: new RegExp('^((\\+84-?)|0)?[0-9]{10}$'),
        message: VALIDATE_MESSAGE.phone
      };
    case 'password':
      return {
        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        message: VALIDATE_MESSAGE.password
      };
    default:
      return {};
  }
};

export function validateWithAntd(listRules) {
  return listRules.map((rule) => getRule(rule));
}
