const getLastDayOfMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
};

class MonthStore {
  month = $state(getLastDayOfMonth());

  setMonth(month: string) {
    this.month = month;
  }
}

export const monthStore = new MonthStore();
