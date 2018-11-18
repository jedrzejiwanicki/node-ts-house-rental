import * as moment from 'moment';


export const getSecondsFromNow = (date: Date): number => moment.duration(moment().diff(moment(date))).asSeconds();