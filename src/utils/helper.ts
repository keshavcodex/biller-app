export const dateFormater = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
};
export const longDateFormater = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
};

export const trimDate = (date: Date) => {
  try {
    date = new Date(date);
    return date.toISOString().slice(0, 10);
  } catch (error) {
    return 'Invalid date';
  }
};

export const monthDayFormatter = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });
  return formattedDate;
};
export const monthYearFormatter = (text: any) => {
  // 1.24 , 2.24, 3.24 ...
  const date = new Date(text);
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${month}.${year}`;
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms*1000));