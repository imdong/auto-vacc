/**
 * 时分比较（time1是否在time2前面，即time1是否比time2小）
 * @param {string} time1 09:12
 * @param {string} time2 14:13
 * @returns 布尔值
 */
export const compareTime = (time1, time2) => {
  const date = new Date()
  const times1 = time1.split(':')
  const times2 = time2.split(':')
  return date.setHours(times1[0], times1[1]) < date.setHours(times2[0], times2[1])
}
