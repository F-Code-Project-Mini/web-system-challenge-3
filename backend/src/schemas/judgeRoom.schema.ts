import { v4 as uuidv4 } from 'uuid';

interface JudgeRoomType {
  id?: string;
  judgeId: string;
  roomId: string;
}

class JudgeRoom {
  id: string;
  judgeId: string;
  roomId: string;

  constructor(judgeRoom: JudgeRoomType) {
    this.id = judgeRoom.id || uuidv4();
    this.judgeId = judgeRoom.judgeId;
    this.roomId = judgeRoom.roomId;
  }
}

export default JudgeRoom;
