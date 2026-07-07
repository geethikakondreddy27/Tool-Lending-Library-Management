const analyticsLogger = (action, entity) => {
  console.log(
    `[Analytics] User performed ${action} on ${entity} at ${new Date().toISOString()}`,
  );
};

module.exports = analyticsLogger;
