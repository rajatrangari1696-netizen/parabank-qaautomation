import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

export default class CustomReporter implements Reporter {
  private startTime = Date.now();

  private testResults: {
    title: string;
    status: string;
    duration: number;
    error?: string;
  }[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
    this.testResults = [];

    console.log('\n========================================');
    console.log('        PARABANK AUTOMATION REPORT');
    console.log('========================================');
    console.log(`Tests: ${suite.allTests().length}`);
    console.log(`Workers: ${config.workers}`);
    console.log('----------------------------------------');
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status.toUpperCase();

    this.testResults.push({
      title: test.title,
      status,
      duration: result.duration,
      error: result.error?.message,
    });

    console.log(
      `${status} | ${test.title} | ${result.duration}ms`
    );

    if (result.error) {
      console.log(`Error: ${result.error.message}`);
    }
  }

  onEnd(result: FullResult) {
    const duration = Date.now() - this.startTime;

    console.log('----------------------------------------');
    console.log(`Final status: ${result.status.toUpperCase()}`);
    console.log(`Total execution time: ${duration}ms`);
    console.log('========================================\n');

    this.generateHtmlReport(result.status, duration);
  }

  private generateHtmlReport(
    finalStatus: string,
    duration: number
  ) {
    const reportDirectory = path.join(
      process.cwd(),
      'custom-report'
    );

    fs.mkdirSync(reportDirectory, { recursive: true });

    const reportPath = path.join(
      reportDirectory,
      'index.html'
    );

    const passed = this.testResults.filter(
      test => test.status === 'PASSED'
    ).length;

    const failed = this.testResults.filter(
      test => test.status === 'FAILED'
    ).length;

    const skipped = this.testResults.filter(
      test => test.status === 'SKIPPED'
    ).length;

    const testRows = this.testResults
      .map(
        test => `
          <div class="test-card">
            <div>
              <h3>${test.title}</h3>
              <p>${test.duration} ms</p>
            </div>
            <span class="status">${test.status}</span>
            ${
              test.error
                ? `<pre>${test.error}</pre>`
                : ''
            }
          </div>
        `
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ParaBank Automation Report</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      color: #ffffff;
      background:
        radial-gradient(circle at top left, #3b2a20, transparent 40%),
        radial-gradient(circle at bottom right, #24170f, transparent 40%),
        #111111;
      padding: 40px;
    }

    .container {
      max-width: 1100px;
      margin: auto;
    }

    .glass {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
    }

    header {
      padding: 30px;
      margin-bottom: 25px;
    }

    h1 {
      margin: 0;
      color: #F48031;
      font-size: 32px;
    }

    .subtitle {
      margin-top: 8px;
      color: #cccccc;
    }

    .summary {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }

    .metric {
      padding: 22px;
    }

    .metric-label {
      color: #aaaaaa;
      font-size: 14px;
    }

    .metric-value {
      margin-top: 8px;
      font-size: 28px;
      font-weight: bold;
      color: #F48031;
    }

    .tests {
      padding: 25px;
    }

    .tests h2 {
      margin-top: 0;
    }

    .test-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 18px;
      margin-top: 12px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      border-left: 4px solid #F48031;
    }

    .test-card h3 {
      margin: 0 0 6px;
    }

    .test-card p {
      margin: 0;
      color: #aaaaaa;
    }

    .status {
      color: #F48031;
      font-weight: bold;
    }

    pre {
      max-width: 100%;
      overflow-x: auto;
      color: #ffb18a;
    }

    @media (max-width: 700px) {
      body {
        padding: 20px;
      }

      .summary {
        grid-template-columns: 1fr 1fr;
      }

      .test-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>

<body>
  <div class="container">

    <header class="glass">
      <h1>ParaBank Automation Report</h1>
      <div class="subtitle">
        Custom Playwright execution report
      </div>
    </header>

    <section class="summary">
      <div class="metric glass">
        <div class="metric-label">Final Status</div>
        <div class="metric-value">${finalStatus.toUpperCase()}</div>
      </div>

      <div class="metric glass">
        <div class="metric-label">Passed</div>
        <div class="metric-value">${passed}</div>
      </div>

      <div class="metric glass">
        <div class="metric-label">Failed</div>
        <div class="metric-value">${failed}</div>
      </div>

      <div class="metric glass">
        <div class="metric-label">Duration</div>
        <div class="metric-value">${duration} ms</div>
      </div>
    </section>

    <section class="tests glass">
      <h2>Test Results</h2>
      ${testRows}
    </section>

  </div>
</body>
</html>
`;

    fs.writeFileSync(reportPath, html, 'utf8');

    console.log(`Custom HTML report: ${reportPath}`);
  }
}