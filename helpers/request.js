const headerParams = (req, headerRequiredParams) => {
  let result = '';

  headerRequiredParams.forEach((headerParam) => {
    if (!req.headers[headerParam]) {
      result += `header.${headerParam}, `;
    }
  });

  return result ? `${result} ARE REQUIRED` : '';
};

module.exports = {
  headerParams,
};
