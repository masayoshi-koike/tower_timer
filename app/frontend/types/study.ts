export interface StudyCalendarResponse {
  /** 表示している月 (YYYY-MM) */
  month: string;
  /** サーバー(日本時間)基準の今日 (YYYY-MM-DD) */
  today: string;
  /** さかのぼれる最初の月 (YYYY-MM) */
  minMonth: string;
  /** 学習した日 (YYYY-MM-DD) => その日の学習時間(分) */
  days: Record<string, number>;
}
