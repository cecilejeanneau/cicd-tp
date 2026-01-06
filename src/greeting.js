
function getGreeting(name) {
  const greeting = `Hello world!`;

  if (name) {
    let wisher;
    if (typeof name === 'symbol' || typeof name === 'function') {
      wisher = `From ${String(name)}`;
    } else {
      wisher = `From ${name}`;
    }
    return `${greeting} ${wisher}`;
  }

  return greeting;
}

module.exports = { getGreeting };
