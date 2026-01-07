const fs = require('fs');
const results = JSON.parse(fs.readFileSync('jest-results.json', 'utf8'));

// Pie chart SVG (simple, not dynamic for now)
function getPieChart(passed, failed, skipped) {
  const total = passed + failed + skipped;
  if (total === 0) return '';
  // Angles
  const passAngle = (passed / total) * 360;
  const failAngle = (failed / total) * 360;
  const skipAngle = (skipped / total) * 360;
  // Pie chart segments (static colors)
  // For simplicity, only works for 3 segments and small numbers
  // For more advanced, use a chart lib and embed as image
  return `
<svg width="120" height="120" viewBox="0 0 32 32">
  <circle r="16" cx="16" cy="16" fill="#eee" />
  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#4caf50" stroke-width="32" stroke-dasharray="${passAngle} 360" transform="rotate(-90 16 16)" />
  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#f44336" stroke-width="32" stroke-dasharray="${failAngle} 360" transform="rotate(${passAngle - 90} 16 16)" />
  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#ffc107" stroke-width="32" stroke-dasharray="${skipAngle} 360" transform="rotate(${passAngle + failAngle - 90} 16 16)" />
</svg>
`;
}

const passed = results.numPassedTests;
const failed = results.numFailedTests;
skipped = results.numPendingTests;
const total = results.numTotalTests;

const summary = [];
summary.push('## 🧪 Jest Test Results');
summary.push('');
summary.push(`<div align="center">${getPieChart(passed, failed, skipped)}</div>`);
summary.push('');
summary.push(`- **Total:** ${total}`);
summary.push(`- **Passed:** ${passed}`);
summary.push(`- **Failed:** ${failed}`);
summary.push(`- **Skipped:** ${skipped}`);
summary.push('');
summary.push('| Suite | Passed | Failed | Skipped | Duration (ms) |');
summary.push('|-------|--------|--------|---------|--------------|');
results.testResults.forEach(suite => {
  let pass = 0, fail = 0, skip = 0;
  if (suite.assertionResults && Array.isArray(suite.assertionResults)) {
    suite.assertionResults.forEach(test => {
      if (test.status === 'passed') pass++;
      else if (test.status === 'failed') fail++;
      else if (test.status === 'pending' || test.status === 'skipped' || test.status === 'todo') skip++;
    });
  }
  const duration = suite.perfStats ? (suite.perfStats.end - suite.perfStats.start) : '';
  summary.push(`| ${suite.name.split('/').pop()} | ${pass} | ${fail} | ${skip} | ${duration} |`);
});
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary.join('\n'));
