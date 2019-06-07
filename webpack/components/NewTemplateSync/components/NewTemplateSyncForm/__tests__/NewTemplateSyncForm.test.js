import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';
import Immutable from 'seamless-immutable';

import NewTemplateSyncForm from '../NewTemplateSyncForm';

import {
  importSettings,
  exportSettings,
  initialValues,
} from '../../../__fixtures__/templateSyncSettings.fixtures';

const noop = () => {};

const commonFixture = {
  importUrl: '/import',
  exportUrl: '/export',
  validationData: {
    repo: ['http://', 'ssh://'],
  },
  userPermissions: {
    import: true,
    export: true,
  },
  handleSubmit: noop,
  valid: true,
  importSettings: Immutable(importSettings),
  exportSettings: Immutable(exportSettings),
  initialValues,
  submitForm: () => {},
};

const fixtures = {
  'should render when for import settings': {
    loadingSettings: false,
    ...commonFixture,
  },
  'should render for export settings': {
    loadingSettings: true,
    ...commonFixture,
    userPermissions: {
      import: false,
      export: true,
    },
  },
};

describe('NewTemplateSyncForm', () =>
  testComponentSnapshotsWithFixtures(NewTemplateSyncForm, fixtures));
