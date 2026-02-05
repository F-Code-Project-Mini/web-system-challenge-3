import { v4 as uuidv4 } from 'uuid';

interface TopicType {
  id?: string;
  title: string;
  filePath: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Topic {
  id: string;
  title: string;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(topic: TopicType) {
    this.id = topic.id || uuidv4();
    this.title = topic.title;
    this.filePath = topic.filePath;
    this.createdAt = topic.createdAt || new Date();
    this.updatedAt = topic.updatedAt || new Date();
  }
}

export default Topic;
