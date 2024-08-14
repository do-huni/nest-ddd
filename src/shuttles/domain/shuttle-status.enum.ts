export enum ShuttleStatus {
  DEMAND_SURVEY = 'DEMAND_SURVEY', // 수요확인중
  PENDING = 'PENDING', // 예약중
  CLOSED = 'CLOSED', // 예약마감
  ENDED = 'ENDED', // 운행종료
  CANCELLED = 'CANCELLED', // 무산
}
