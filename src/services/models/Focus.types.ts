export default interface Focus {
  taskId: string;
  userId: string;
  running: boolean;
  duration: any;
  reseted: number;
  paused: number;
  startedAt: Date;
  pausedAt?: any;
  stopedAt?: any;
  finishedAt?: any;
  createdAt?: any;
  updatedAt?: any;
}
