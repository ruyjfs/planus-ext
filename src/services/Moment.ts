import dayjs from 'dayjs';

export default dayjs;

const Custom = {
  toView(date: any) {
    if (dayjs(new Date()).diff(dayjs(date), 'day') > 2) {
      return dayjs(date).format('DD/MM/YYYY H[h]m');
      // dayjs().format('D/MM/Y HH[h]mm')
    } else {
      return dayjs(date).format('DD/MM/YYYY H[h]m');
      // return dayjs(date).fromNow(true);
    }
  },
};

const Calendar = {
  daysMonth(date = new Date()): any {
    // console.log(
    //   moment(date)
    //     .startOf('month')
    //     .add(2, 'days'),
    // );
    console.log('SSS');
    const currentMonthDates = Array.from(
      { length: parseInt(dayjs(date).format('D')) },
      (x, i) => {
        return {
          day: i + 1,
          date: dayjs(date).startOf('month').add(i, 'day'),
          yearDay: parseInt(
            dayjs(date).startOf('month').add(i, 'day').format('YDDD')
          ),
        };
      }
    );
    return currentMonthDates;
  },
};

export { Custom, Calendar };
