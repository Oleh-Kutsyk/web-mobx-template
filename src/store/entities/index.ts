import { createEntitiesModel } from '../utils/entitiesModel';
import { pushNotificationsEntity } from './pushNotifications';
import { popUpNotifications } from './popUpNotifications';
import { bannerNotifications } from './bannerNotifications';
import { categories } from './categories/category';
import { instruments } from './instruments/instrument';
import { countries } from './countries';
import { customerGroups } from './customerGroups';
import { bonuses } from './bonuses';

export const entities = createEntitiesModel({
  countries,
  bonuses,
  customerGroups,
  pushNotifications: pushNotificationsEntity,
  bannerNotifications,
  popUpNotifications,
  instruments,
  categories,
});
