// Takes a date and displays it in yyyy-mm-dd format
export const displayDate = (dateString) => {

    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' };

    return date.toLocaleDateString('en-US', options);

};