/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.FeaturePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Features',
  },
  scaffoldingHeader: {
    id: `${scope}.scaffolding.header`,
    defaultMessage: 'Quick scaffolding',
  },
});
