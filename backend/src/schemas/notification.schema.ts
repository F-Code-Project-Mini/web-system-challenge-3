import { v4 as uuidv4 } from 'uuid';

interface NotificationType {
  id?: string;
  title: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Notification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(notification: NotificationType) {
    this.id = notification.id || uuidv4();
    this.title = notification.title;
    this.message = notification.message;
    this.createdAt = notification.createdAt || new Date();
    this.updatedAt = notification.updatedAt || new Date();
  }
}

export default Notification;
