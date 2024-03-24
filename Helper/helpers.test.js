import helpers from './helpers'; // Adjust the import path as needed

describe('MonthYearDate function', () => {
  it('returns the correct formatted date for a given date', () => {
    const date = new Date('2023-06-21');
    const formattedDate = helpers.MonthYearDate(date);
    expect(formattedDate).toEqual('Jun 21, 2023');
  });

  it('returns the correct formatted date for the current date if no date is provided', () => {
    const formattedDate = helpers.MonthYearDate();
    const currentDate = new Date();
    const expectedDate = currentDate.toLocaleString('en-us', {
        day: 'numeric', year: 'numeric', month: 'short'
    });
    expect(formattedDate).toEqual(expectedDate);
  });
});

describe('timeOnly function', () => {
  it('returns the correct formatted time for a given date', () => {
    const date = new Date('2023-01-01T02:23:23Z');
    const formattedTime = helpers.timeOnly(date);
    expect(formattedTime).toEqual('7:23:23 AM');
  });

  it('returns the correct formatted time for the current time if no date is provided', () => {
    const formattedTime = helpers.timeOnly();
    const currentTime = new Date();
    const expectedTime = currentTime.toLocaleString('en-us', {
      hour: 'numeric',
      minute: '2-digit',
      second: 'numeric',
    });
    expect(formattedTime).toEqual(expectedTime);
  });
});

describe('shortMonthDateTime function', () => {
  it('returns the correct formatted date and time for a given date', () => {
    const date = new Date('2023-01-20T14:03:00Z');
    const formattedDateTime = helpers.shortMonthDateTime(date);
    expect(formattedDateTime).toEqual('Jan 20, 23, 7:03 PM');
  });
});

describe('isEmail function', () => {
  it('returns true for a valid email address', () => {
    const validEmail = 'test@example.com';
    expect(helpers.isEmail(validEmail)).toBe(true);
  });

  it('returns false for an invalid email address', () => {
    const invalidEmail = 'invalid-email';
    expect(helpers.isEmail(invalidEmail)).toBe(false);
  });
});
