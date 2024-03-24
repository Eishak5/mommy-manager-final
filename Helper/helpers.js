const helpers={
    MonthYearDate: (val) => {
        const date = val ? new Date(val) : new Date(); // 2020-06-21
        const option = {day: 'numeric', year: 'numeric', month: 'short' };
        return date.toLocaleString('en-us', option); // Jun 2023
      },
      timeOnly: (val) => {
        const date = val ? new Date(val) : new Date();
        const option = { hour: 'numeric', minute: '2-digit', second: 'numeric' };
        return date.toLocaleString('en-us', option); // 2:23:23
      },
      shortMonthDateTime: (val) => {
        const date = new Date(val); // 2020-06-21
        const option = {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        return date.toLocaleString('en-us', option); // Jan 20, 2023 2:3 PM
      },
      isEmail:(email)=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
      }
}
export default helpers;