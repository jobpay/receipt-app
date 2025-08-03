import Moment from 'moment';

/**
 * インタースティシャル広告を出す
 */
export const getDateString = (date, format) => {
    return Moment(date).format(format).toString();
}