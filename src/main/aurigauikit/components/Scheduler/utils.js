import moment from "moment"
import { daysEnum } from "./constants"

export const toExpression = state => {
  const date = state.date || moment()
  const second = 0
  const minute = date.minute()
  const hour = date.hour()
  const dayOfMonth = date.date()
  const month = date.month() + 1
  const year = date.year()
  let cronExp = `${second} ${minute} ${hour} `
  switch (state.recurring) {
    case "NEVER":
      cronExp += `${dayOfMonth} ${month} ?`
      break
    case "DAILY":
      cronExp += `*/${state.repeatEvery} * ?`
      break
    case "WEEKLY":
      cronExp += `? * ${state.weekly.days.map(x => x.substring(0, 3)).join(",")}`
      break
    case "MONTHLY":
      switch (state.monthly.mode) {
        case "DAY":
          cronExp += `${state.monthly.day} */${state.repeatEvery} ?`
          break
        case "DAY_OF_WEEK":
          cronExp +=
            `? */${state.repeatEvery} ${daysEnum[state.monthly.weekDay]}` +
            (state.monthly.order === "FIRST"
              ? "#1"
              : state.monthly.order === "SECOND"
                ? "#2"
                : state.monthly.order === "THIRD"
                  ? "#3"
                  : state.monthly.order === "FOURTH"
                    ? "#4"
                    : "L")
          break
      }
      break
  }
  return { state: state, startDate: date, end: state.end, cronExp }
}
