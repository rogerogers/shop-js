export const getPercentageDiff = (original: any, calculated: any) => {
  const diff = original - calculated;
  const decrease = (diff / original) * 100;

  return decrease.toFixed();
};
