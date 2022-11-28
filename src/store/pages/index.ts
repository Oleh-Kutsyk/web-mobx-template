import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { brandConfigurationPage } from './brandConfiguration';
import { depositInfoPage } from './depositInfo';
import { atmDepositInfoPage } from './atmDepositInfo';
import { leverageInfoPage } from './leverageInfo';
import { instrumentsPage } from './instruments';
import { atmButtonsConfigurationInfoPage } from './atmButtonsConfiguration';
import { bannerNotificationPage } from './bannerNotification';
import { popUpNotificationPage } from './popUpNotification';
import { pushNotifications } from './pushNotifications';
import { categoriesStore } from './categories';
import { customerGroups } from './customerGroups';
import { bonusesPage } from './bonuses';

export const pages = types.model('pages', {
  brandConfigurationPage,
  depositInfoPage,
  atmDepositInfoPage,
  leverageInfoPage,
  instrumentsPage,
  bonusesPage,
  categories: categoriesStore,
  customerGroups,
  atmButtonsConfigurationInfoPage,
  pushNotifications,
  bannerNotificationPage,
  popUpNotificationPage,
});

export type TPagesStore = Instance<typeof pages>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPagesStoreIn extends SnapshotIn<typeof pages> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IPagesStoreOut extends SnapshotOut<typeof pages> {}
