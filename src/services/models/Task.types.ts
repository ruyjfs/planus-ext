export default interface Task {
  text: string;
  done: boolean;
  dayWeek: number;
  updatedAt?: string;
  userId: string;
  createdAt: any;
}
