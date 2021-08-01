import { createNotificationContext } from 'react-notification-provider';

// interface Notification {
//   message: string;
//   duration: number;
//   level: 'success' | 'error';
// }

const { NotificationProvider, useNotificationQueue } =
  createNotificationContext();

export { NotificationProvider, useNotificationQueue };
