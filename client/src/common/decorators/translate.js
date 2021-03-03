import { withTranslation } from 'react-i18next';

export default function translateDecorator(options = null) {
  return (WrappedComponent) => withTranslation(options)(WrappedComponent);
}
