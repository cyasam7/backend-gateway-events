export interface IUseCase<Input, Output> {
  execute(data: Input): Output | Promise<Output>;
}

export enum EMicroservices {
  NOTIFICATIONS = 'NOTIFICATIONS',
  REPORTS = 'REPORTS',
}

export enum EQueue {
  NOTIFICATIONS = 'NOTIFICATIONS',
  REPORTS = 'REPORTS',
}
export enum EChanelEvents {
  EMAIL_NOTIFICATION = 'EMAIL_NOTIFICATION',
}
